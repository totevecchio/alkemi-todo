const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/users");

router.get("/", controllerUser.user_get_user_data);

router.post("/add", controllerUser.new_user);

router.delete("/delete/:id", controllerUser.user_delete);

router.delete("/deleteall/", controllerUser.user_delete_all);

module.exports = router;