const router = require("express").Router();
const AuthCtl = require("../controllers/Auth");
const auth_path = "/api/v1/auth";

router.post(`${auth_path}/signup`, AuthCtl.signup);
router.post(`${auth_path}/login`, AuthCtl.login);

module.exports = router;
