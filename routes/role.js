const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const { createRole, dropRole, alterRole, grantRolesOrSysPrivsController, grantTabOrColPrivsController,
    revokeRolesOrSysPrivsController, revokeTabOrColPrivsController } = require("../controllers/role");
const { requireSignin } = require("../middlewares");

const router = express.Router();

router.post("/role/create", requireSignin, createRole);
router.delete("/role/:roleName",requireSignin, dropRole);
router.put("/role/", requireSignin, alterRole);
router.post("/role/grantRolesOrSysPrivs", requireSignin, grantRolesOrSysPrivsController);
router.post("/role/grantTabOrColPrivs",requireSignin, grantTabOrColPrivsController);
router.post("/role/revokeRolesOrSysPrivs", requireSignin, revokeRolesOrSysPrivsController);
router.post("/role/revokeTabOrColPrivs",requireSignin, revokeTabOrColPrivsController);

module.exports = router;