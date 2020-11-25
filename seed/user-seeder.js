const User = require('../models/User');
const mongoose = require('mongoose');

try {
  mongoose.connect(
    "mongodb+srv://peteryu:peteryu@cluster0.y73ab.mongodb.net/Cluster0?retryWrites=true&w=majority"
  );
  const users = [
    new User({
      name: 'Jessie Fry',
      email: 'jessiefry@gmail.com',
      password: '123456789',
      friends: [],
    }),
    new User({
      name: 'Hugo Orr',
      email: 'hugoorr@gmail.com',
      password: '123456789',
      friends: [],
    }),
    new User({
      name: 'Addison Case',
      email: 'addisoncase@gmail.com',
      password: '123456789',
      friends: [],
    }),
    new User({
      name: 'Brittany Schmidt',
      email: 'schmidt@gmail.com',
      password: '123456789',
      friends: [],
    }),
    new User({
      name: 'Millie Richardson',
      email: 'millierichardson@gmail.com',
      password: '123456789',
      friends: [],
    }),
  ];
  let i,
    done = 0;

  for (i = 0; i < users.length; i++) {
    users[i].save(() => {
      done++;
      if (done === users.length) {
        mongoose.disconnect();
      }
    });
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}