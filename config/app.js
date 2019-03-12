const express = require("express");
const cors = require("cors");
const axios = require("axios");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const env = require("./env");

const defaultCallback = () => {};

const start = (port = env.port, router, callback = defaultCallback) => {
  const app = express();

  app.use(cors());
  router.addRoutes(app);
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server listening on port ${port}.`);
    callback();
  });
};

module.exports = { start };
