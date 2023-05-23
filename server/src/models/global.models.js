const { Schema, model } = require('mongoose')

exports.AddressSchema = new Schema({
  city: { type: String, required: false },
  street: { type: String, required: false },
  zipCode: { type: Number, required: false },
})
