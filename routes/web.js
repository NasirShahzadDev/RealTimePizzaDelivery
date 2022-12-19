const express = require("express");
const router = express.Router();
const PizzaController = require("../app/controllers/menuController");
const CartController = require("../app/controllers/cartController");

// router.get("/", (req, res) => {
//   res.render("home");
// });

router.get("/", PizzaController.getMenu);
router.post("/updateCart", CartController.updateCart);

router.get("/cart", (req, res) => {
  res.render("customers/cart");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.get("/register", (req, res) => {
  res.render("auth/register");
});

module.exports = router;
