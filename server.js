const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

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
  .then(data => data);
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('database.users');
  // res.send(database.users);
  // console.log(database.users);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileRequest(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImageRequest(req, res, db);
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is runing on port${process.env.PORT}`);
});
