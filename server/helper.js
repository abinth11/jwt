const bcrypt = require('bcrypt')
const user = require('./schema.js')
module.exports = {
  registerUser: async (userInfo) => {
    try {
      const { name, mobile, email, password } = userInfo;
      const emailExist = await user.findOne({ email });
      const phoneExist = await user.findOne({ mobile });
      if (phoneExist) {
        return {
          status: false,
          Message: "Phone number already exists please try to login",
        };
      }
      if (emailExist) {
        return {
          status: false,
          Message: "Email already exist please try to login",
        };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = new user({
        name,
        mobile,
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
  loginUser: async (loginInfo)=> {
    const { username, password } = loginInfo;
    try {
      const userExist = await user.findOne({
        $or: [{ email: username }, { mobile: username }],
      });
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
        return {
          status: true,
          Message: "Successfully logged in",
        };
      } else {
        return {
          status: false,
          Message: "Entered wrong password",
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
