const express = require("express");
const app = express();
var http = require("http");
var reload = require("reload");
const fs = require("fs");
const port = 3000;
const data = require(__dirname + "/Class2/assets/data/products.json");

app.use(express.static("Class2/assets"));

app.get(["/", "/home", "/products", "/contact"], (req, res) => {
  res.sendFile(__dirname + "/Class2/index-planned.html");
});

app.get("/api/get/products", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

var server = http.createServer(app);

// Reload code here
reload(app)
  .then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    server.listen(port, function () {
      console.log("Web server listening on port " + port);
    });
  })
  .catch(function (err) {
    console.error(
      "Reload could not start, could not start server/sample app",
      err
    );
  });
