const axios = require("axios");
const { env } = require("../config/env");
const { generateRandomString } = require("../helpers/generateRandomString");

const buildUrl = (githubClientId, callbackUrl) => {
  console.log(callbackUrl);
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
      return res.status(200).json({ accessToken });
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { authenticateWithGithub, generateAccessToken };
