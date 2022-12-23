const UserService = require("../services/userService");
const bcrypt = require("bcrypt");
const passport = require("passport");

const register = async (req, res) => {
  try {
    const user = req.body;

    //check user existence
    const userExists = await UserService.getExistingUser({
      userName: user.userName,
      email: user.email,
    });
    if (userExists) {
      req.flash("error", "Name or Email already exist... try another!");
      req.flash("userName", user.userName);
      req.flash("email", user.email);
      return res.redirect("register");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user["password"] = hashedPassword;
    //create user
    await UserService.createUser(req.body);
    return res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    res.redirect("/register ");
  }
};
const _getRedirectUrl = (req) => {
  return req.user.role === "admin" ? "/admin/orders" : "/customers/orders";
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Validate request
  if (!email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/login");
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("error", info.message);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      return res.redirect(_getRedirectUrl(req));
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    req.flash("error", "something went wrong in logout");
    return res.redirect("/");
  }
};

module.exports = { register, login, logout };
