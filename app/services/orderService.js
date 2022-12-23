const OrderModel = require("../models/orderModel");

const orderCreate = async (data) => {
  try {
    const order = new OrderModel(data);
    return await order.save();
  } catch (error) {
    throw error;
  }
};

const orderGet = async (customerId) => {
  try {
    const order = await OrderModel.find({ customerId }, null, {
      sort: { createdAt: -1 },
    });
    return order;
    // console.log(customerId);
  } catch (error) {
    throw error;
  }
};

const show = async ({ id }) => {
  try {
    return await OrderModel.findById({ _id: id });
  } catch (error) {
    throw error;
  }
};
module.exports = { orderCreate, orderGet, show };
