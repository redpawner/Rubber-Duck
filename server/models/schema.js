const mongoose = require('mongoose');
const { Schema } = mongoose;
const conn = require('./db');

const User = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  user_languages: [{ type: String, required: true }],
});

const Users = conn.model('Users', User);

module.exports = Users;
