const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'orxan',
      email: 'abdullabashir@gmail.com',
      password: 'abdullabashir',
      entries: 0,
      joined: new Date()
    },
    {
      id: '125',
      name: 'abdulla',
      email: 'abdulla@gmail.com',
      password: '123456',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
  // console.log(database.users);
});
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('no such user');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('no such user');
  }
});

app.post('/signin', (req, res) => {
  // bcrypt.compare(
  //   '123456',
  //   '$2a$10$l3cLE1BTQeR2ocG825bzdO0.l8B0ROoGBgQfexusheN1o3J8CvAj2',
  //   function(err, res) {
  //     console.log('1', res);
  //   }
  // );
  // bcrypt.compare("veggies", hash, function(err, res) {
  //     // res = false
  // });
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error');
  }
});

app.post('/register', (req, res) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.listen(3001, () => {
  console.log('app is runing on port 3001');
});

//  res = this is working /
//  signin --> POST = success/fail /
//  register --> POST = user
//  /profile/:userld --> GET =user
//  /image --> PUT --> user
