import mongoose from 'mongoose';
import conn from './db';

const { Schema } = mongoose;

const User = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  user_languages: [{ type: String, required: true }],
});

const Users = conn.model('Users', User);

module.exports = Users;
