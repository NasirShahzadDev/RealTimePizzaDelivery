const express = require("express");
const router = express.Router();
const PizzaController = require("../app/controllers/menuController");

router.post("/pizza", PizzaController.createMenu);
router.get("/showPizza", PizzaController.getMenu);

module.exports = router;
