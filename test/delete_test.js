const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe  = new User({name: 'Joe'});
    joe.save().then(() => done());
  });

  it('Model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('Class method remove', (done) => {
    User.remove({name: joe.name})
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('Class method findAndRemove', (done) => {
    User.findOneAndRemove({name: joe.name})
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('Class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });
});