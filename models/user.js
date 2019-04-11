const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/hashPassword')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please fill name'],
  },
  email: {
    type: String,
    required: [true, 'please fill email'],
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`]
  },
  password: {
    type: String,
    required: [true, 'please fill password']
  }
})

userSchema.pre('save', function(next) {
  if(this.password) {
    this.password = hash(this.password)
  }
  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User;