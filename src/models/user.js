import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String },
  name: { type: String },
  email: { type: String }
})

export const User = model('User', userSchema);
