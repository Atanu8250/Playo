const express = require('express');
const EventModel = require('../models/event.model');
const ApplicationModel = require('../models/application.model');

const eventRouter = express.Router();

// GET ALL EVENTS
eventRouter.get('/', async (req, res) => {
     try {
          const events = await EventModel.find()
          res.status(200).send({ message: 'success', data: events });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
})


// GET EVENTS BY CREATED BY SPECIFIC USER
eventRouter.get('/myevents', async (req, res) => {
     const userId = req.headers.userId;
     try {
          const events = await EventModel.find({ organisedBy: userId });
          res.status(200).send({ message: 'success', data: events });
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
})


// CREATE EVENT
eventRouter.post('/', async (req, res) => {
     const event = req.body;
     const userId = req.headers.userId;
     try {
          const newEvent = new EventModel({ ...event, organisedBy: userId });
          await newEvent.save();
          res.status(201).send({ message: 'Event created successfully.' })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }
})


// UPDATE EVENT 
eventRouter.patch('/:eventId', async (req, res) => {
     const eventId = req.params.eventId;
     const userId = req.headers.userId;
     const update = req.body;
     try {
          // ONLY THE CREATOR CAN UPDATE THE SPECIFIC EVENT WHICH IS CREATED BY HIM/HER.
          const matchedEvents = await EventModel.find({ _id: eventId, organisedBy: userId })
          if (matchedEvents.length) {
               let updateEvent = matchedEvents[0];
               try {
                    if (update.addParticipant) {
                         let participants = [...updateEvent.participants, update.addParticipant]
                         updateEvent = { ...updateEvent, participants };
                         const applications = await ApplicationModel.find({ user: update.addParticipant, event: updateEvent._id });
                         const application = applications[0];
                         application.status = 'accepted';
                         await application.save();
                    } else {
                         updateEvent = { ...updateEvent, ...update };
                    }
                    await updateEvent.save();
                    res.status(200).send({ message: 'Event udpated successfully.' })
               } catch (error) {
                    console.log('error:', error)
                    res.status(500).send({
                         message: error.message,
                         error
                    });
               }
          } else {
               res.status(404).send({ message: "Sorry, You don't have any event with this Event Id!" })
          }
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({
               message: error.message,
               error
          });
     }

})


module.exports = eventRouter;
