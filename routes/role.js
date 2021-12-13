const express = require("express");

//const { requireSignin, isAdmin } = require("../middlewares");
const { createRole, dropRole, alterRole, grantRolesOrSysPrivsController, grantTabOrColPrivsController,
    revokeRolesOrSysPrivsController, revokeTabOrColPrivsController } = require("../controllers/role");

const router = express.Router();

router.post("/role/create", createRole);
router.delete("/role/:roleName", dropRole);
router.post("/role/:roleName", alterRole);
router.post("/role/grantRolesOrSysPrivs", grantRolesOrSysPrivsController);
router.post("/role/grantTabOrColPrivs", grantTabOrColPrivsController);
router.post("/role/revokeRolesOrSysPrivs", revokeRolesOrSysPrivsController);
router.post("/role/revokeTabOrColPrivs", revokeTabOrColPrivsController);