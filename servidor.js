const path = require("path");
const express = require("express");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.get("/", (_request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`De TH para Melo está no ar em http://localhost:${port}`);
});
