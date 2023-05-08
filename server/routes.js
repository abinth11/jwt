const express = require("express");
const router = express.Router();
const userHelpers = require("./helper");
const JWTHelpers = require("./jwt");
const jwt = require("jsonwebtoken");
const { user } = require("./schema");
const refreshTokens = [];
router.post("/user-register", async (req, res) => {
  try {
    console.log(req.body);
    const response = await userHelpers.registerUser(req.body);
    console.log(response);
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
    console.log(error);
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
    console.log(req.body);
    const response = await userHelpers.loginUser(req.body);
    console.log(response);
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
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});
router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    console.log("refresh token");
    console.log(refreshToken);
    if (!refreshToken) {
      res.status(401).json({
        status: false,
        code: 401,
        message: "You are not authenticated",
      });
    } else {
      jwt.verify(refreshToken, "refresh_secret_key", async (err, userInfo) => {
        if (err) {
          console.log(err);
          res.status(403).json({
            status: false,
            code: 403,
            message: "Your token is not valid",
          });
        } else {
          const tokenExist = await user.findOne({ email: userInfo?.email });
          console.log(tokenExist)
          if (tokenExist?.tokens?.length==0) {
            res.status(403).json({
              status: false,
              code: 403,
              message: "Your token is not valid",
            });
          } else {
            jwt.verify(refreshToken, "refresh_secret_key",async (err, userInfo) => {
              if (err) {
                res.status(400).json({
                  status: false,
                  message: "Error occurred while verifying your token",
                  err,
                });
              }
              await user.updateOne(
                { email: userInfo?.email },
                { $pull: { tokens:refreshToken } }
              );
              const newAccessToken = JWTHelpers.generateAccessToken(userInfo);
              const newRefreshToken = JWTHelpers.generateRefreshToken(userInfo);
              refreshTokens.push(newRefreshToken);
              res.status(200).json({
                status: true,
                code: 200,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                message: "Token is valid and refreshed successfully",
              });
            });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error, Message: "internal server error" });
  }
});


router.get("/get-user-data", JWTHelpers.verifyJwt, async (req, res) => {
  try {
    const { email } = req.user;
    const response = await userHelpers.getUserData(email);
    console.log(response);
    response
      ? res.status(200).json({
          statusCode: 200,
          successMessage: "Successfully authorized",
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
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      successMessage: null,
      errorMessage: "Internal server error",
      data: null,
      error: error,
    });
  }
});

module.exports = router;
