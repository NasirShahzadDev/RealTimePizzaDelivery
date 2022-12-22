const axios = require("axios");
const Noty = require("noty");
const { initAdmin } = require("./admin");
const addToCart = document.querySelectorAll(".add-to-cart"); //get all buttons
const cartCounter = document.querySelector("#cartCounter");
let updateCart = (pizza) => {
  axios
    .post("/updateCart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to cart!",
        progressBar: false,
        layout: "bottomLeft",
      }).show();
    })
    .catch((error) => {
      console.log(error);
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something wrong...",
      }).show();
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.menu);
    //JSON.parse : to convert string into object
    //JSON.Stringify: to convert object into string
    //will get value of manu using dataset in form of (JSON String)
    console.log(pizza);
    updateCart(pizza);
  });
});

//after getting all buttons we'll access every button using forEach(btn) and will
//apply "click" eventlisener on all btn(s) and will get event from (e)

const alertMessage = document.querySelector("success-alert");
if (alertMessage) {
  setTimeout(() => {
    alertMessage.remove();
  }, 2000);
}

initAdmin();
