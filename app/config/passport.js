const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Login
        // check if email exists
        const user = await UserModel.findOne({ email: email });
        console.log(user);
        if (!user) {
          return done(null, false, {
            message: "User not exist... try another!",
          });
        }
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Successfully! Logged in " });
            }
            return done(null, false, { message: "Password not matched..." });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong" });
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
