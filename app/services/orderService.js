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
    console.log("service customer id", customerId);
    const order = await OrderModel.find({ customerId }, null, {
      sort: { createdAt: -1 },
    });
    return order;
    // console.log(customerId);
  } catch (error) {
    throw error;
  }
};
module.exports = { orderCreate, orderGet };
