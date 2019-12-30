const Joi = require('joi');
const { mongoConnect } = require("./util/database");
const bookings = require('./routes/bookings');
const express = require('express');
const http = require('http');
const app = express();


app.use(express.json());
app.use('/api/bookings', bookings);

const port = process.env.PORT || '3434';


app.set('port', port);
const server = http.createServer(app);

mongoConnect(() => {
  server.listen(port);
  console.log(`Listening on port ${port}...`)
});

module.exports = app;

