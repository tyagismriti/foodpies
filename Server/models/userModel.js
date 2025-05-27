const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: true
  }, 
  password: {
    type: String,
    required: true
  }    
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function (name, email, pass) {
  if (!email || !pass || !name) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(pass)) {
    throw Error('Password is not strong enough')
  }
  
  const exists = await this.findOne({email})
  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(pass, salt)

  const user = await this.create({name, email, password: hash})
  return user
}

// statis login method
userSchema.statics.login = async function (email, pass) {
  if (!email || !pass) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  const user = await this.findOne({email})
  if (!user) {
    throw Error('Email is not registered!')
  }

  const match = await bcrypt.compare(pass, user.password)
  if (!match){
    throw Error('Incorrect Password!')
  }

  return user
}


const UserModel = mongoose.model("User", userSchema);
module.exports =  UserModel;