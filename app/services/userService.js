const userModel = require("../models/userModel");

const createUser = async (data) => {
  try {
    //
    const user = new userModel(data);
    return await user.save();
  } catch (error) {
    throw error;
  }
};
const getExistingUser = async ({ email }) => {
  try {
    const existingUser = await userModel.findOne({ email: email }).lean();
    return existingUser;
  } catch (error) {
    throw error;
  }
};
const updateUser = async ({ userId, dataToUpdate }) => {
  try {
    const user = await userModel.findByIdAndUpdate(userId, dataToUpdate);
    return user;
  } catch (error) {
    throw error;
  }
};
const getUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getExistingUser, updateUser, getUserById };
