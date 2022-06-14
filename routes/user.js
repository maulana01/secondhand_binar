const router = require("express").Router();
const UserCtl = require("../controllers/user");
const IsAuth = require("../middleware/is-auth");
const user_path = "/api/v1/user";

router.get(`${user_path}/all`, UserCtl.getAll);
router.get(`${user_path}/:id`, IsAuth, UserCtl.getById);
router.post(`${user_path}/create`, IsAuth, UserCtl.create);
router.put(`${user_path}/update/:id`, IsAuth, UserCtl.update);
router.delete(`${user_path}/delete/:id`, IsAuth, UserCtl.delete);

module.exports = router;
