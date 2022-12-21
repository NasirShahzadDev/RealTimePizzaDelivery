const UserService = require("../services/userService");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const { JWT_SECRET } = require("../../app/config/credentials");
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
    // return res.status(201).json({
    //   message: "Successfully User Created",
    //   create,
    // });
  } catch (error) {
    req.flash("error", "Something went wrong!");
    res.redirect("/register ");
  }
};
// ////////////login controller
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserService.getExistingUser({ email });
//     if (!user) {
//       req.flash("error", "User not exist...");
//       return res.redirect("/login");
//       // req.flash("email", user.email);
//     }
//     const matchPassword = await bcrypt.compare(password, user.password);
//     if (!matchPassword) {
//       req.flash("error", "Password not matched...");
//       req.flash("email", user.email);
//     }
//     const uniqueKey = uuidv4();
//     await UserService.updateUser({
//       userId: user._id,
//       dataToUpdate: { uniqueKey: uniqueKey },
//     });
//     return res.redirect("/", { user: user });
//     // req.flash("error", "Successfully! Logged in");

//     // return res.redirect("/login");
//   } catch (error) {
//     req.flash("error", "Something went wrong!");
//     res.redirect("/login");
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     // error=>null, user=>user/false, info=>message ------> all from config/passport.js
//     await passport.authenticate("local", (error, user, info) => {
//       if (error) {
//         req.flash("error", info.message);
//         return next(error);
//       }
//       if (!user) {
//         req.flash("error", info.message);
//         return res.redirect("/login");
//       }
//     });
//     res.login(user, (error) => {
//       if (error) {
//         req.flash("error", info.message);
//         return next(error);
//       }
//       return res.redirect("/");
//     })(req, res, next);
//   } catch (error) {}
// };

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

      return res.redirect("/");
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  return await res.redirect("/login");
};

module.exports = { register, login, logout };
