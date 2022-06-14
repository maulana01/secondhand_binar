const router = require("express").Router();
const AuthCtl = require("../controllers/Auth");
const base_url = "/api/v1/auth";

router.post(`${base_url}/signup`, AuthCtl.signup);
router.post(`${base_url}/login`, AuthCtl.login);

module.exports = router;
