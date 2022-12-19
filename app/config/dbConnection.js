const mongoose = require("mongoose");
const { MONGO_URL } = require("./credentials");
const dbConnect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Successfully DB Connected!");
    })
    .catch((error) => {
      console.log("Failed DB Connection!", error);
    });
};

module.exports = { dbConnect };
