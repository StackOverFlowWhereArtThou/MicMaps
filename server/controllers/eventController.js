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
    // if a put request came through the form, then send a put request
    console.log("Did we make a put request?")
    if (req.body.putRequest === 'put') {
      console.log("YES!");
      return eventController.updateEvent(req, res, next);
    }

    if (req.body.putRequest === 'delete') {
      console.log("YES!");
      return eventController.deleteEvent(req, res, next);
    }

    const newEvent = await Event.create({
      eventName: req.body.eventName,
      address: req.body.address,
      lat: req.body.lat,
      long: req.body.long,
      type: req.body.type,
      eventKey: req.body.eventKey
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

eventController.updateEvent = async (req, res, next) => {
  console.log("update request made");
  console.log("req.body\n", req.body, "\nreq.params\n", req.params, "\nreq.query\n", req.query);
  try {
    await Event.updateOne(
      { eventKey: req.body.eventKey },
      {
        eventName: req.body.eventName,
        address: req.body.address,
        lat: req.body.lat,
        long: req.body.long,
        type: req.body.type,
      },
    );
    return next();
  } catch (error) {
    return next(error);
  }
};

eventController.deleteEvent = async (req, res, next) => {
  console.log('deleteEvent triggered');

  try {
    await Event.deleteMany({ eventKey: req.body.eventKey }, (err) => {
      if (err) return next(err);
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = eventController;
