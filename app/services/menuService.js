const MenuModel = require("../models/menuModel");

const createMenu = async (data) => {
  try {
    const menu = new MenuModel(data);
    await menu.save();
  } catch (error) {
    throw error;
  }
};

const getMenu = async () => {
  try {
    return await MenuModel.find();
  } catch (error) {
    throw error;
  }
};
module.exports = { createMenu, getMenu };
