const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const {
  getAllPrivilegesController,
  getAllRoleController,
  getAllPrivsByRoleController,
  getAllUsersByRoleController,
  getAllProfilesController,
  getProfileInfoController,
  getAllUsersByProfileController,
  getAllUserController,
  getUserByUsernameController,
  getAllRolesByUsernameController,
  getAllPrivsByUsernameController,
  getUserInfoByUserConnectionController,
} = require("../controllers/tableInfo");
const { requireSignin, isAdmin } = require("../middlewares");

const router = express.Router();

router.get("/tableInfo/getAllPrivileges", getAllPrivilegesController);

router.get("/tableInfo/getAllRole", requireSignin, getAllRoleController);
router.get(
  "/tableInfo/getAllPrivsByRole/:roleName",
  requireSignin,
  isAdmin,
  getAllPrivsByRoleController
);
router.get(
  "/tableInfo/getAllUsersByRole/:roleName",
  requireSignin,
  isAdmin,
  getAllUsersByRoleController
);

router.get(
  "/tableInfo/getAllProfiles",
  requireSignin,
  isAdmin,
  getAllProfilesController
);
router.get(
  "/tableInfo/getProfileInfo/:profileName",
  requireSignin,
  isAdmin,
  getProfileInfoController
);
router.get(
  "/tableInfo/getAllUsersByProfile/:profileName",
  requireSignin,
  isAdmin,
  getAllUsersByProfileController
);

router.get("/tableInfo/getAllUser", getAllUserController);
router.get(
  "/tableInfo/getUserByUsername/:username",
  getUserByUsernameController
);
router.get(
  "/tableInfo/getAllRolesByUsername/:username",
  getAllRolesByUsernameController
);
router.get(
  "/tableInfo/getAllPrivsByUsername/:username",
  getAllPrivsByUsernameController
);

router.get(
  "/tableInfo/getUserInfoByUserConnection",
  requireSignin,
  getUserInfoByUserConnectionController
);

module.exports = router;
