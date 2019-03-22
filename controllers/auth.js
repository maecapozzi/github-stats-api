const axios = require("axios");
const { env } = require("../config/env");
const { generateRandomString } = require("../helpers/generateRandomString");
const redis = require("redis");
const { client } = require("../config/app");
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const buildUrl = (githubClientId, callbackUrl) => {
  return `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${callbackUrl}&scope=repo`;
};

const authenticateWithGithub = (req, res) => {
  const { githubClientId, callbackUrl } = env;
  const url = buildUrl(githubClientId, callbackUrl);
  return res.status(200).json({ url });
};

const generateAccessToken = (req, res) => {
  const { githubClientId, githubClientSecret, callbackUrl } = env;
  axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    header: "Content-Type: application/json",
    data: {
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code: req.query.code,
      redirect_uri: callbackUrl
    }
  })
    .then(response => {
      const accessToken = response.data.split("access_token=")[1].split("&")[0];

      return setAsync("accessToken", accessToken).then(token => {
        res.status(200).json({
          isLoggedIn: true,
          success: {
            message: "You successfully set an access token"
          }
        });
      });
    })
    .catch(err => res.status(500).json(err));
};

const logout = (req, res) => {
  client.del("accessToken");

  res.send(302).redirect("/");
};

module.exports = { authenticateWithGithub, generateAccessToken, logout };
