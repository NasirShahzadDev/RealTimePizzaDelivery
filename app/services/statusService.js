const OrderModel = require("../models/orderModel");

const updateStatus = async ({ orderId, status }) => {
  try {
    return await OrderModel.updateOne(
      { _id: orderId },
      { status: status },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { updateStatus };
