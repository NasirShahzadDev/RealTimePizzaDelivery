const express = require("express");
const router = express.Router();
const PizzaController = require("../app/controllers/menuController");
const CartController = require("../app/controllers/customer/cartController");
const AuthController = require("../app/controllers/authController");
const OrderController = require("../app/controllers/customer/orderController");
const AdminOrderController = require("../app/controllers/admin/orderController");
const StatusController = require("../app/controllers/admin/statusController");
const guest = require("../app/middleware/guest");
const auth = require("../app/middleware/auth");
const admin = require("../app/middleware/admin");

//home route
router.get("/", PizzaController.getMenu);

//cart route
router.get("/cart", (req, res) => {
  res.render("customers/cart");
});
router.get("/customers/cart", (req, res) => {
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
router.post("/logout", AuthController.logout);

//order route
router.post("/orders", auth, OrderController.createOrder);
router.get("/customers/orders", auth, OrderController.getOrder);
router.get("/customers/orders", auth, (req, res) => {
  res.render("customers/orders");
});
router.get("/customers/orders/:id", auth, OrderController.show);

// admin routes
router.get("/admin/orders", admin, AdminOrderController.getOrderByAdmin);
router.get("/admin/orders", admin, (req, res) => {
  res.render("admin/orders");
});

//status route
router.post("/admin/order/status", admin, StatusController.update);

module.exports = router;
