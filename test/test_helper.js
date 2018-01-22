const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  // mongoose.connect('mongodb://65.34.5.12:4000/users_test');
  mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => console.warn('Warning', error));
});

beforeEach((done) => {
  const {users, blogposts, comments} = mongoose.connection.collections;

  users.drop(() => {
    blogposts.drop(() => {
      comments.drop(() => {
        done();
      })
    })
  });
});
