const crypto = require("crypto");
const db = require('_helpers/db');

module.exports = {
  addCoupon,
  getCoupons,
};



async function addCoupon(params, origin) {

  const existingUser = await db.Coupon.findOne({ uuid: params.uuid })

  // if user has added coupons before add to users array of coupons
  if (existingUser) {
    existingUser.coupons.push({ store: params.store, code: params.code});
    return existingUser.save()
  }

  // create new coupon object 
  const coupon = new db.Coupon({
    uuid: params.uuid,
    coupons:[{
      store: params.store,
      code: params.code
    }]
  });
  // save account
  await coupon.save();
}

async function getCoupons() {
  const coupons = await db.Coupon.find();
  return coupons;
}

async function getCouponsByUser() {
  const allDocs = await getCoupons()
  
  // allDocs.
}