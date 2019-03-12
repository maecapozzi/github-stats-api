const app = require("./config/app");
const router = require("./config/routes");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
app.start(PORT, router);

module.exports = app;
