const express = require("express");
const router = express.Router();
const controllerAbm = require("../controllers/abm");

router.get("/:l", controllerAbm.abm_get_all);

router.post("/add", controllerAbm.abm_add);

router.put("/update/:id", controllerAbm.abm_update);

router.delete("/delete/:id", controllerAbm.abm_delete);

router.delete("/deleteall/", controllerAbm.abm_delete_all);

module.exports = router;
