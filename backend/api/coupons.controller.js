const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const couponService = require('./coupon.service');

// routes
router.post('/add-coupon', couponSchema, addCoupon)
router.get('/get-coupons', authorize(Role.Admin), getCoupons)

module.exports = router;

function couponSchema(req, res, next) {
  const schema = Joi.object({
    store: Joi.string().required(),
    code: Joi.string().required(),
    uuid: Joi.string().required()
  })
  validateRequest(req, next, schema)
}

function addCoupon(req, res, next) {
  couponService.addCoupon(req.body, req.get('origin'))
    .then(() => res.json({ message: 'Coupon succesfully Added to your account!' }))
    .catch(next);
}

function getCoupons(req, res, next) {
  couponService.getCoupons()
    .then((coupons) => res.json(coupons))
    .catch(next)
}