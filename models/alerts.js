var mongoose = require("mongoose");

var alertSchema = new mongoose.Schema({
   pincode: String,
   phoneNumber: String,
   createdAt:{type: Date, default: Date.now},
});

module.exports = mongoose.model("Alerts", alertSchema);