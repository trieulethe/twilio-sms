const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    type: String,
    index: true
  },
  first_name: String,
  last_name: String,
  email: String,
  country: String,
  province: String,
  city: String,
  address_line: String,
  postal_code: String,
  verify_code: Number,
  verified: {
    type: Boolean,
    default: false
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Users", UserSchema);