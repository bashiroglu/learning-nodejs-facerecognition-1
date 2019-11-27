const express = require('express');

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: '123',
      name: 'orxan',
      email: 'orxan@gmail.com',
      password: '12345',
      entries: 0
    },
    {
      id: '125',
      name: 'abdulla',
      email: 'abdulla@gmail.com',
      password: '123456',
      entries: 0
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
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

app.post('/image', (req, res) => {
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
  if (
    req.body.email === database.users[1].email &&
    req.body.password === database.users[1].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error');
  }
});

app.post('/register', (req, res) => {
  const { name, password, email } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password
  });
  res.json(database.users[database.users.length - 1]);
});

app.listen(3000, () => {
  console.log('app is runing on port 3000');
});

//  res = this is working /
//  signin --> POST = success/fail /
//  register --> POST = user
//  /profile/:userld --> GET =user
//  /image --> PUT --> user
