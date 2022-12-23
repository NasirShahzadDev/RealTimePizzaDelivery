const StatusService = require("../../services/statusService");

const update = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body.status;
    await StatusService.updateStatus({ orderId, status });
    //emit events
    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("orderUpdated", { id: orderId, status: status });
    return res.redirect("/admin/orders");
  } catch (error) {
    req.flash("error", "something went wrong in status update");
  }
};

module.exports = { update };
