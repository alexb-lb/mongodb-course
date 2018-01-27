const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assosiations', () => {
  let joe, comment, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content: 'Yeap its true'});
    comment = new Comment({content: 'New comment on post'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
  });

  it('Saves a relation between a user and a blogpost', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === blogPost.title);
        done();
      });
  });

  it('Saves a full relation graph', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === joe.name);
        assert(user.blogPosts[0].title === blogPost.title);
        assert(user.blogPosts[0].comments[0].content === comment.content);
        assert(user.blogPosts[0].comments[0].user.name === joe.name);
        done();
      });
  });
});