var express = require("express");
var router = express.Router();

const RoutesAuthentication = require("../util/RoutesAuthentication");
const GetUser = require("../controller/GetUser");
const GetPeriods = require("../controller/GetPeriods");
const GetGroupTypes = require("../controller/GetGroupTypes");
const GetInteractionRoles = require("../controller/GetInteractionRoles");

// Makes sure that the User ID that is passed is the same as the env mock auth
router.use(RoutesAuthentication);

router.get("/periods", GetPeriods);
router.get("/group-types", GetGroupTypes);
router.get("/interaction-roles", GetInteractionRoles);
router.get("/user", GetUser);


module.exports = router;
