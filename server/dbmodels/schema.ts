import { Schema } from 'mongoose';
import { User, HelpReqSchema } from '../interfaces/interfaces';
import conn from './db';

const helpRequestSchema = new Schema<HelpReqSchema>({
  _id: String,
  username: String,
  title: String,
  description: String,
  hr_languages: [String],
  time_created: Date,
});

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    user_languages: [
      {
        type: String,
        enum: {
          values: ['Javascript', 'Java', 'PHP', 'C#'],
          message: 'No language selected.',
        },
      },
    ],
    rating_total: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    needHelp: { type: Boolean, default: false },
    help_request: helpRequestSchema,
  },
  { timestamps: true }
);

const Users = conn.model('User', userSchema);

module.exports = Users;
