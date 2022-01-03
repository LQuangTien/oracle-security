const profileRoutes = require("./profile");
const roleRoutes = require("./role");
const tableInfoRoutes = require("./tableInfo");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const adminAuthRoutes = require("./admin_auth");

module.exports = [
  profileRoutes,
  roleRoutes,
  tableInfoRoutes,
  userRoutes,
  authRoutes,
  adminAuthRoutes,
];
