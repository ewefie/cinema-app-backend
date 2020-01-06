const Joi = require('joi');
const { mongoConnect } = require("./util/database");
const { removeNotConfirmedBookings } = require('./util/confirmationManager')
const bookings = require('./routes/bookings');
const express = require('express');
const http = require('http');
const cron = require('node-cron');
const app = express();


app.use(express.json());

app.use((req, res, next) => {
  const APP_URL = "*";
  res.setHeader("Access-Control-Allow-Origin", APP_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

//this method clears db every hour from not confirmed bookings if they were not 
//deleted correctly in 5 minuts after makeing reservetion;
cron.schedule("00 * * * *", removeNotConfirmedBookings);

module.exports = app;

