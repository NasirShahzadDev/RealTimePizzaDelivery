const MenuService = require("../services/menuService");

const createMenu = async (req, res) => {
  try {
    const pizza = req.body;
    const menu = await MenuService.createMenu(pizza);
    return res.status(200).json({
      message: "Successfully Menu Created!",
      menu,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Failed: Menu Creation!",
    });
  }
};
const getMenu = async (req, res) => {
  try {
    const menu = await MenuService.getMenu();
    return res.render("home", { menu: menu });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Failed: Menu not showing...",
    });
  }
};

module.exports = { createMenu, getMenu };
