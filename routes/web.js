const express = require("express");
const router = express.Router();
const PizzaController = require("../app/controllers/menuController");
const CartController = require("../app/controllers/cartController");
const AuthController = require("../app/controllers/authController");
const guest = require("../app/middleware/guest");

//home route
router.get("/", PizzaController.getMenu);

//cart route
router.get("/cart", (req, res) => {
  res.render("customers/cart");
});
router.post("/updateCart", CartController.updateCart);

//register route
router.get("/register", guest, (req, res) => {
  res.render("auth/register");
});
router.post("/register", AuthController.register);

//login route
router.get("/login", guest, (req, res) => {
  res.render("auth/login");
});
router.post("/login", guest, AuthController.login);

//logout route
router.get("/logout", (req, res) => {
  res.render("auth/login");
});
router.post("/logout", AuthController.logout);
module.exports = router;
