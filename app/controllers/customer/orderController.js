const OrderService = require("../../services/orderService");
const moment = require("moment");
const createOrder = async (req, res) => {
  try {
    const customerId = req.user._id;
    const items = req.session.cart.items;
    const { phone, address } = req.body;
    await OrderService.orderCreate({
      customerId,
      items,
      phone,
      address,
    });

    req.flash("success", "Successfully! Order placed...");
    delete req.session.cart;
    return res.redirect("/customers/orders");
  } catch (error) {
    req.flash("error", "something went wrong in order");
    return res.redirect("/cart");
  }
};

const getOrder = async (req, res) => {
  try {
    const customerId = req.user._id;
    const orders = await OrderService.orderGet(customerId);
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    ); //no need of cache
    res.render("customers/orders", { orders: orders, moment: moment });
  } catch (error) {
    req.flash("error", "something went wrong in order");
    return res.redirect("/cart");
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.show({ id });
    if (req.user._id.toString() === order.customerId.toString()) {
      res.render("customers/singleOrder", { order });
    }
  } catch (error) {
    return res.redirect("/");
  }
};
module.exports = { createOrder, getOrder, show };
