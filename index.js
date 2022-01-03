const cors = require("cors");
const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { formatInput, checkIfUserHasPrivilege } = require("./middlewares");
const app = express();

env.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(());
// app.use(());

routes.forEach((route) => {
  app.use("/api", formatInput, checkIfUserHasPrivilege, route);
});

app.listen(5000, () => {
  console.log("Server is running on port:", 5000);
});
