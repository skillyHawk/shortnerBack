const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "jwt_secret";

require("./passportStrategy.js");

router.post("/", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        // User not logged in (inexistant or technical error)
        return res.status(401).json({
          message: "Failed authentification",
          user,
          err,
          info
        });
      }
      req.login(user, { session: false }, loginErr => {
        if (loginErr) {
          // Failed (technically) to log the user in
          return res.status(401).json({
            message: "Couldn't log you in due to technical problem",
            user,
            loginErr
          });
        }
        user.password = undefined;
        const token = jwt.sign(user, jwtSecret);
        return res.status(200).json({ user, token });
      });
    })(req, res);
  });
  

module.exports = router;