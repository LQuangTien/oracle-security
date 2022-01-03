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

const router = express.Router();

router.get("/tableInfo/getAllPrivileges", getAllPrivilegesController);

router.get("/tableInfo/getAllRole", getAllRoleController);
router.get(
  "/tableInfo/getAllPrivsByRole/:roleName",
  getAllPrivsByRoleController
);
router.get(
  "/tableInfo/getAllUsersByRole/:roleName",
  getAllUsersByRoleController
);

router.get("/tableInfo/getAllProfiles", getAllProfilesController);
router.get("/tableInfo/getProfileInfo/:profileName", getProfileInfoController);
router.get(
  "/tableInfo/getAllUsersByProfile/:profileName",
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
  getUserInfoByUserConnectionController
);

module.exports = router;
