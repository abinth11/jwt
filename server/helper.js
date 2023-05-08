const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {user} = require("./schema.js");
module.exports = {
  registerUser: async (userInfo) => {
    try {
      const { username, email, password } = userInfo;
      const emailExist = await user.find({ 'email':email });
      console.log(emailExist)
      if (emailExist.length!==0) {
        return {
          status: false,
          Message: "Email already exist please try to login",
        };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = new user({
        username,
        email,
        password: hashedPassword,
      });
      const result = await data.save();
      return {
        status: true,
        data: result,
        Message: "Successfully registered",
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  loginUser: async (loginInfo) => {
    const { username, password } = loginInfo;
    try {
      const userExist = await user.findOne({ email:username });
      if (!userExist) {
        return {
          status: false,
          Message: "User does not exist please enter valid email",
        };
      } else if (userExist?.blocked) {
        return {
          status: false,
          blocked: true,
          Message: "User is blocked",
        };
      }
      const hashedPassword = userExist?.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        const token = jwt.sign({username:userExist?.username,email:userExist?.email }, 'secret_key', { expiresIn: '1h' });
        console.log(token)
        return {
          status: true,
          token,
          Message: "Successfully logged in",
        };
      } else {
        return {
          status: false,
          token:null,
          Message: "Entered wrong password",
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  getUserData:async(email) =>{
    try {
      console.log(email)
      const userData = await user.findOne({email})
      return userData
    } catch (error){
      throw new Error(error)
    } 
  }
};
