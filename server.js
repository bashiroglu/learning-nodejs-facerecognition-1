const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: '123',
      name: 'orxan',
      email: 'orxan@gmail.com',
      password: '12345'
    },
    {
      id: '124',
      name: 'abdulla',
      email: 'abdulla@gmail.com',
      password: '123456'
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
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
