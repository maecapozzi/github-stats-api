var express = require("express");
var router = express.Router();
const passport = require("passport");
const { LocalStorage } = require("node-localstorage");

router.get("/", function(req, res, next) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    localStorage = new LocalStorage("./accessToken");
  }

  var GitHubStrategy = require("passport-github").Strategy;

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        localStorage.setItem("accessToken", accessToken);
      }
    )
  );

  const accessToken = localStorage.getItem("accessToken");
  res.json({ accessToken });
});

module.exports = router;
