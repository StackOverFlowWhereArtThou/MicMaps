const Event = require('../models/eventModel');

const eventController = {};

eventController.addEvent = async (req, res, next) => {
  console.log('addEvent req body', req.body);
  console.log('addEvent req params', req.params);

  try {
    console.log(
      'Am I pulling variables?',
      req.body
    );
    const newEvent = await Event.create({
      eventName: req.body.eventName,
      address: req.body.address,
      lat: req.body.lat,
      long: req.body.long,
      type: req.body.type,
    });

    console.log('newEvent', newEvent);
    // res.locals.event = newEvent;
    return next();
  } catch (error) {
    res.sendStatus(400);
    return next(error);
  }
};

eventController.getEvents = async (req, res, next) => {
  // Gather all point data from DB
  Event.find({}, (err, events) => {
    console.log('events.length\n', events.length);
    if (err) {
      return res.status(400).json(err);
    }
    // console.log('students\n', students);
    // console.log('events[0]', events[0]);
    res.locals.events = events;
    // return res.status(200).json(res.locals.student);
    return next();

  });
};

module.exports = eventController;
