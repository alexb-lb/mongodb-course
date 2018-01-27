const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let alex, be4a, codl, joe;

  beforeEach((done) => {
    alex = new User({name: 'Alex'});
    be4a = new User({name: 'Be4a'});
    codl = new User({name: 'Codl'});
    joe = new User({name: 'Joe'});

    Promise.all([alex.save(), be4a.save(), codl.save(), joe.save()])
      .then(() => done());
  });

  it('Finds all users with a name of Joe', (done) => {
    User.find({name: 'Joe'})
      .then((users) => {
        // because of _id is and object inside mongo,transform object into string
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });

  it('Find a user with a particular id', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        // because of _id is and object inside mongo,transform object into string
        assert(user.name === joe.name);
        done();
      })
  });

  it('Can skip and limit number of users', (done) => {
    User.find({})
      .sort({name: 1})
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === be4a.name);
        assert(users[1].name === codl.name);
        done();
      });
  })
});