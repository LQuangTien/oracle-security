const cors = require("cors");
const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes')

const app = express();

env.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.forEach(route => {
  app.use("/api", route);
})

app.listen(3000, () => {
  console.log("Server is running on port:", 3000);
});