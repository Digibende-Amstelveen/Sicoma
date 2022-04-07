// Modules
const express = require("express");

// Built in modules
const path = require("path");
const fs = require("fs");

// Local modules
const config = require("../sicoma.config");
const log = require("./reuse/log");

if (!fs.existsSync(path.join(__dirname, "../sicoma.config.js"))) log.failure("Please create a sicoma.config.js file in the root.");

const app = express();

app.listen(config.server.port, () => {
  log.normal(`Listening on http://localhost:${config.server.port}`);
});