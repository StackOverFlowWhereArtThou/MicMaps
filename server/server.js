const express = require('express');
const app = express();
const path = require('path');
const eventController = require('./controllers/eventController');
const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost/CodesmithSoloProject1';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, '../build/assets')));

app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  console.log("we have triggered a get request!");
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/form', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../form.html'));
});

app.post('/event', eventController.addEvent, (req, res) => {
  console.log("event post made");
  console.log('event post req.body\n', req.body);
  console.log('event item in res\n', req.body.lat);

  res.redirect('../');
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000);

module.exports = app;
