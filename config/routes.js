const auth = require("../controllers/auth");
const pullRequests = require("../controllers/pullRequests");

const addRoutes = app => {
  app.get("/", (req, res) => res.send("hello world!"));
  app.get("/auth/github", auth.authenticateWithGithub);
  app.get("/access-token", auth.generateAccessToken);
  app.get("/pullRequests", pullRequests.index);
  app.get("/logout", auth.logout);
};

module.exports = {
  addRoutes
};
