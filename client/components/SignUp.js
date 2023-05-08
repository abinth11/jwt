import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import './signup.css';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) =>{
    e.preventDefault()
    const formData = {
      username,
      email,
      password,
      confirmPassword
    }
    fetch('http://localhost:3000/user-register', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(async response => {
      const parsedResponse = await response.json()
      const {data} = parsedResponse
      if(!data?.status){
          alert(data?.Message)
      }else {
        alert('Successfully registered..!')

        location.reload()
      }
      console.log(parsedResponse)
  }).catch(err => {
      console.log(err)
  })
  }

  return (
    <form className="signup-form" style={{marginTop:"60px"}} onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label htmlFor="username" className="signup-label">Username:</label>
      <input type="text" id="username" name="username" value={username} onChange={e=>{setUsername(e.target.value)}} className="signup-input" />

      <label htmlFor="email" className="signup-label">Email:</label>
      <input type="email" id="email" name="email" value={email} onChange={e=>{setEmail(e.target.value)}} className="signup-input" />

      <label htmlFor="password" className="signup-label">Password:</label>
      <div className="password-input">
        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={e=>{setPassword(e.target.value)}} name="password" className="signup-input" />
        {/* {showPassword ? (
          <RiEyeOffFill className="password-icon" onClick={handleShowPassword} />
        ) : (
          <RiEyeFill className="password-icon" onClick={handleShowPassword} />
        )} */}
      </div>

      <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
      <div className="password-input">
        <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword"value={confirmPassword} onChange={e=>{setConfirmPassword(e.target.value)}} className="signup-input" />
        {/* {showPassword ? (
          <RiEyeOffFill className="password-icon" onClick={handleShowPassword} />
        ) : (
          <RiEyeFill className="password-icon" onClick={handleShowPassword} />
        )} */}
      </div>

      <button type="submit" className="signup-button">Sign Up</button>

      <p className="signup-login-link" style={{textAlign:'center'}}>
        Already have an account? <a href="/login" className="signup-login-link">Log in</a>
      </p>
    </form>
  );
};

export default SignUpForm;
