const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe', likes: 20});
    joe.save().then(() => done());
  });

  function assertName(operation, name, done) {
    operation
      .then(() => User.findOne({name}))
      .then((user) => {
        assert(user.name === name);
        done();
      })
      .catch((e) => {
      })
  }

  it('Instance type using set and save', (done) => {
    // cause .set() hasn't promise chaining
    // best using when we called different func to change some document,
    // and then save all together to prevent call DB every time to make a little change
    joe.set('name', 'Alex');

    // .set() saves in memory, so we need to save into DB after .set called
    assertName(joe.save(), 'Alex', done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({name: 'Alex'}), 'Alex', done);
  });

  it('A model class can update', (done) => {
    // for every elem in collection with name Joe replace with Alex
    assertName(
      User.update({name: 'Joe'}, {name: 'Alex'}),
      'Alex',
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
      'Alex',
      done
    );
  });

  it('A model class can find a record with id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
      'Alex',
      done
    );
  });

  // xit - mocha will not execute this test
  it('A user can have their postCount incremented by 1', (done) => {
    // increment for every user with name Joe
    User.update({name: joe.name}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user.likes === joe.likes + 1);
        done();
      })
  });
});