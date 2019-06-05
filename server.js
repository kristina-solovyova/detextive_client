const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

// Enable monitoring
require("newrelic");

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));
const port = process.env.PORT || 80;
app.listen(port);

console.log("server started on port " + port);
