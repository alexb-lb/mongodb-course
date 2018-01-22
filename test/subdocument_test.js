const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('Can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [
        {title: 'post title'},
        {title: 'second post'}
      ]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[1].title === joe.posts[1].title);
        done();
      })
  });

  it('Can add a subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'post title'}]
    });

    joe.save()
      .then(() => User.findOneAndUpdate({name: 'Joe'}, {$push: {posts: {title: 'Another post'}}}))
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 2);
        assert(user.posts[1].title === 'Another post');
        done();
      })
  });

  it('Can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [
        {title: 'post title'},
        {title: 'second post'}
      ]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        user.posts[1].remove();
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 1);
        done();
      });
  })
});