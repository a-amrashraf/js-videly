const e = require("express");
const Joi = require("joi");

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  phone: { type: Number, required: true },
  isGold: { type: Boolean, required: true, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);



function ValidateCustomer(Customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean().required(),
  });

  return schema.validate(Customer);
}

exports.Customer = Customer;
exports.ValidateCustomer = ValidateCustomer;
exports.customerSchema = customerSchema;

