const mongoose = require('mongoose');

// mongoose.connect('mongodb://65.34.5.12:4000/users_test');
mongoose.connect('mongodb://localhost/users_test');

mongoose.connection
  .once('open', () => console.log('Mongoose connected'))
  .on('error', (error) => console.warn('Warning', error));