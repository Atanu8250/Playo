const express = require("express");
const ApplicationModel = require("../models/application.model");
const EventModel = require("../models/event.model");

const applicationRouter = express.Router();

// APPLY FOR THE EVENT
applicationRouter.get('/:eventId', async (req, res) => {
     const eventId = req.params.eventId;
     const userId = req.headers.userId;
     try {
          const events = await EventModel.findById(eventId);
          if (events[0].limit === events[0].participants.length) {
               res.status(200).send({ message: 'Sorry, Events participant limit reached!' })
          } else {
               const applications = await ApplicationModel.find({ event: eventId, user: userId });
               if (applications.length) {
                    res.status(400).send({ message: `Your application is already in ${applications[0].status} status` })
               } else {
                    const application = new ApplicationModel({ event: eventId, user: userId });
                    await application.save();
                    res.status(201).send({ message: 'Applied successfully' });
               }
          }
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
})


// REJECT APPLICATION
applicationRouter.patch('/reject/:applicationId', async (req, res) => {
     const applicationId = req.params.applicationId;
     try {
          const applications = await ApplicationModel.findById(applicationId);
          console.log('applications:', applications)
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
})

module.exports = applicationRouter;