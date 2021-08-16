const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // store: { type: String, required: true },
  // code: { type: String, required: true },
  uuid: { type: String, required: true },
  coupons: [{
      store: {type: String},
      url: {type: String},
      code: {type: String}
    }],
  created: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Coupon', schema);