const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const eventSchema = new Schema({
  eventName: { type: String, required: true, unique: false },
  address: { type: String, required: false },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  type: { type: String, required: true },
  eventKey: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);
