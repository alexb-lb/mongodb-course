const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // 1st arg - true\false, second - error message
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must must be longer than 2 characters'
    }
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// setup postCount as virtual type - it will be calculate after user will fetch
// user ES5 getter - its important to use "function" keyword, not "() =>"
// because in this case keyword "this" will belong to whole file, not user model instance
UserSchema.virtual('postCount').get(function (){
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;