const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      connectDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createDate: {
    type: Date,
    default: Date.now
  }
});

let User;
module.exports = User = mongoose.model('users', UserSchema);