const Router = require("express").Router();
const eventController =  require("../Controller/EventController");
const storage = require("../Multer/storage");




Router.post("/events", storage.single("eventimg"), eventController.postEvent);
Router.get("/events/:events_id?", eventController.getEvent);                              // Here I combine two Routes into one 
Router.put("/events/:id",eventController.updateEvent)
Router.delete("/events/:id",eventController.deleteEvent)



module.exports = Router;