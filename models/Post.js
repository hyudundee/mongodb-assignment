const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

let Post;
module.exports = Post = mongoose.model('post', Post);
