const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save().then(() => done());
  });

  it('Finds all users with a name of Joe', (done) => {
    User.find({name: 'Joe'})
      .then((users) => {
      // because of _id is and object inside mongo,transform object into string
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  }).timeout('10s');

  it('Find a user with a particular id', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        // because of _id is and object inside mongo,transform object into string
        assert(user.name === joe.name);
        done();
      })
  }).timeout('10s');
});