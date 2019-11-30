const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '10091996',
    database: 'smart-brain'
  }
});

db.select('*')
  .from('users')
  .then(data => console.log(data));

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
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('could not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entires'));
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
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json('unable to register'));
});

app.listen(3001, () => {
  console.log('app is runing on port 3001');
});

//  res = this is working /
//  signin --> POST = success/fail /
//  register --> POST = user
//  /profile/:userld --> GET =user
//  /image --> PUT --> user
