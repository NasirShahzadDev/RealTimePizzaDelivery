const OrderModel = require("../../models/orderModel");

const getOrderByAdmin = async (req, res) => {
  try {
    await OrderModel.find({ status: { $ne: "completed" } }, null, {
      sort: { createdAt: -1 },
    })
      .populate("customerId", "-password")
      .exec((error, orders) => {
        if (req.xhr) {
          return res.json(orders);
        } else {
          res.render("admin/orders");
        }
      });
  } catch (error) {
    req.flash("error", "something went wrong in admin order");
    return res.redirect("/cart");
  }
};

module.exports = { getOrderByAdmin };
