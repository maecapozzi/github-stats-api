const auth = require("../controllers/auth");

const addRoutes = app => {
  app.get("/", (req, res) => res.send("hello world!"));
  app.get("/auth/github", auth.authenticateWithGithub);
  app.get("/access-token", auth.generateAccessToken);
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};

module.exports = {
  addRoutes
};
