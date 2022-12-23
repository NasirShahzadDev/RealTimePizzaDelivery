const axios = require("axios");
const Noty = require("noty");
const { initAdmin } = require("./admin");
const moment = require("moment");

const addToCart = document.querySelectorAll(".add-to-cart"); //get all buttons
const cartCounter = document.querySelector("#cartCounter");
let updateCart = (pizza) => {
  axios
    .post("/updateCart", pizza)
    .then((res) => {
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

// Change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement("small");

function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}

updateStatus(order);
//socket code

const socket = io();

if (order) {
  socket.emit("join", `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  initAdmin(socket);
  socket.emit("join", "adminRoom");
}

socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    type: "success",
    timeout: 1000,
    text: "Successfully Order Updated!",
    progressBar: false,
  }).show();
});
