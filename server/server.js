// server.js
const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf')

const app = express();

app.use(cors());

const jwtSecret = 'secret123';
app.get('/jwt', (req, res) => {
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

app.use(cookieParser());

// il default estrae il coocki dall'Authorization Bearer
// app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

// Cosi gli dico di estrarlo dal coockie
app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'], getToken: req => req.cookies.token }));

// Per evitare CSRF
const csrfProtection = csrf({
  cookie: true
});
app.use(csrfProtection);

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];
app.get('/foods', (req, res) => {
  res.json(foods);
});

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post('/foods', (req, res) => {
  foods.push({
    id: foods.length + 1,
    description: 'new food'
  });
  res.json({
    message: 'Food created!'
  });
});

app.listen(3001);
console.log('App running on localhost:3001');