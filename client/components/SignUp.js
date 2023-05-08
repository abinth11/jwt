import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import './signup.css';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="signup-form" style={{marginTop:"60px"}}>
      <h2>Sign up</h2>
      <label htmlFor="username" className="signup-label">Username:</label>
      <input type="text" id="username" name="username" className="signup-input" />

      <label htmlFor="email" className="signup-label">Email:</label>
      <input type="email" id="email" name="email" className="signup-input" />

      <label htmlFor="password" className="signup-label">Password:</label>
      <div className="password-input">
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="signup-input" />
        {/* {showPassword ? (
          <RiEyeOffFill className="password-icon" onClick={handleShowPassword} />
        ) : (
          <RiEyeFill className="password-icon" onClick={handleShowPassword} />
        )} */}
      </div>

      <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
      <div className="password-input">
        <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" className="signup-input" />
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
