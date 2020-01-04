const Joi = require('joi');
const { mongoConnect } = require("./util/database");
const bookings = require('./routes/bookings');
const express = require('express');
const http = require('http');
const app = express();


app.use(express.json());

app.use((req, res, next) => {
  const APP_URL = "*";
  res.setHeader("Access-Control-Allow-Origin", APP_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, PATCH");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-access-token");
  next();
});

app.use('/api/bookings', bookings);

const port = process.env.PORT || '3434';


app.set('port', port);
const server = http.createServer(app);

mongoConnect(() => {
  server.listen(port);
  console.log(`Listening on port ${port}...`)
});

module.exports = app;

