const express = require('express')
const router = express.Router()
const userHelpers = require('./helper')
const JWT = require('./jwt')
router.post("/user-register", async (req, res) => {
  try {
    console.log(req.body)
    const response = await userHelpers.registerUser(req.body);
    console.log(response)
    if (!response.status) {
      res.status(409).json({
        statusCode: 409,
        successMessage: "Unable to register the user",
        errorMessage: null,
        data: response,
        error: null,
      });
    } else if (response.status) {
      res.status(200).json({
        statusCode: 200,
        successMessage: "Successfully registered the user",
        errorMessage: null,
        data: response,
        error: null,  
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        successMessage: "Failed to register",
        errorMessage: "Invalid credentials",
        data: null,
        error: response,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

router.post("/user-login", async (req, res) => {
  try {
    console.log(req.body)
    const response = await userHelpers.loginUser(req.body);
    console.log(response)
    response.status
      ? res.status(200).json({
          statusCode: 200,
          successMessage: "Successfully logged in",
          errorMessage: null,
          data: response,
          error: null,
        })
      : res.status(400).json({
          statusCode: 400,
          successMessage: null,
          errorMessage: "Password incorrect",
          data: response,
          error: null,
        });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});


router.get("/get-user-data",JWT.verifyJwt, async (req, res) => {
  try {
    const {email}= req.user;
    const response = await userHelpers.getUserData(email);
    console.log(response)
    response
      ? res.status(200).json({
          statusCode: 200,
          successMessage: "Successfully authenticated",
          errorMessage: null,
          data: response,
          error: null,
        })
      : res.status(400).json({
          statusCode: 400,
          successMessage: null,
          errorMessage: "Something went wrong...",
          data: response,
          error: null,
        });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

module.exports = router