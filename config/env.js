require("dotenv").config();

const env = {
  callbackUrl: process.env.CALLBACK_URL,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  port: process.env.PORT
};

module.exports = { env };
