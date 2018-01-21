const assert = require('assert');
const User = require('../src/user');

describe('creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({name: 'Joe'});
    joe.save()
      .then(() => {
      // isNew === true - document has not been saved
        assert(!joe.isNew);
        done();
      })
  }).timeout('10s');
});
