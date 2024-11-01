const cloudinary = require("../Cloudinary/Cloudinary");
const  getEventCollection   = require("../EventCollection/eventCollection");
const { getDb } = require("../Db/Connection");
const { ObjectId } = require("mongodb");
const { application } = require("express");

const postEvent = async(req,res)=>{
 
   
    
    try {
   
        
        const { name, tagline, description, moderator, category, subcategory, rigor_rank, Schedule ,attandees} = req.body;
    

        // if (!name || !tagline || !description || !moderator || !category || !subcategory || !rigor_rank || !Schedule ||  !attandees) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }
     
    
        
        let fileUrl = null;
        if (req.file && req.file.path) {
            const upload = await cloudinary.uploader.upload(req.file.path);
            fileUrl = upload.secure_url;
        }
    
      
        const data = {
             name, tagline, description, moderator, category, subcategory, rigor_rank, Schedule:new Date(Schedule), attandees,
            img:fileUrl
        };
    
        // Insert data into database
        const events = getEventCollection();
        const result = await events.insertOne(data);
    
    
        console.log("Data successfully inserted");
        const Eventid = new String(result.insertedId);
        res.status(200).json(Eventid)
        

        
        // res.status(200).json(result);
    
    } catch (error) {
        console.error("Error creating collection:", error);
        res.status(500).json({ error: "Internal server error" });
    }


   
    
    
    
  
}

const getEvent = async(req,res) =>{
 try {
    try {


        const {events_id} = req.query;
        
        if(events_id !== undefined){
            const db = getDb();
            const eventsCollection = db.collection("events");
            
            // Fetch data from the collection (e.g., find all documents)
            const events = await eventsCollection.find({_id:new ObjectId(events_id)}).toArray();
            
            res.status(200).json(events);
        }else{
            
            const query = {}
            const type = req.query.type || "all";
            const limit = parseInt(req.query.limit) || 4; 
            const page = parseInt(req.query.page) || 1;    
            const Skip = (page - 1) * limit;
            const db = getDb();
            const eventsCollection = db.collection("events");
            const data = await eventsCollection.find().toArray();
            
            if(type == "letest"){
                console.log(Skip);
                
                const letestevents = data.filter((events,index)=>{
                    if(index > Skip){
                     return events.type == "letest"
                    }
                })

                if(letestevents.length >=1){
                   return res.status(200).json(letestevents)
                }

                res.status(400).json({error:"There is no letest events explore upcoming events"})
              
             
                
            }
            
            
        }
        
        
      
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal server error" });
    } 
     
    
    
 } catch (error) {
    console.log(error);
    
 }    
    
}


 const updateEvent = async(req,res)=>{
   
     try {
         
     const { name, tagline, description, moderator, category, subcategory, rigor_rank, Schedule,attandees } = req.body;
      
     const {id} = req.params;

    if (!name || !Schedule || !description || !moderator || !category || !subcategory || !rigor_rank || !Schedule || !attandees) {
        return res.status(400).json({ error: "All fields are required, including Schedule" });
    }

      
    let fileUrl = null;
    if (req.file && req.file.path) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        fileUrl = upload.secure_url;
    }
 

    const data = {
        name,
        tagline,
        description,
        moderator,
        category,
        subcategory,
        rigor_rank,
        Schedule: new Date(Schedule),
        fileUrl,
        attandees
    };

    

   
    const events = getEventCollection();
    

    
    const existingEvent = await events.findOne({_id:new ObjectId(id)});
     

    if(existingEvent){
     await events.deleteOne({_id:new ObjectId(id)});
    const newupdatedEvent = await events.insertOne(data);
    console.log(newupdatedEvent);
    }else{
       return  res.status(400).json({error:"event is not found"})
    }


    res.status(200).json("Event updated Successfully")
    
    


} catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "An error occurred while updating the document" });
}

   
}


const deleteEvent = async(req,res)=>{
    try {

        const {id} = req.params;

        const events = getEventCollection();
        const findEvent = await events.findOne({_id:new ObjectId(id)});

        if(findEvent == null){
            return res.status(400).json({error:"Error while Deleting"})
        }else{
            await events.deleteOne({_id:new ObjectId(id)});
            return res.status(200).json("Event is deleted Successfully");
        }
        
   

   
        

       
    } catch (error) {
        console.log("error while deleting",error);
        
    }
}


module.exports = { postEvent,getEvent,updateEvent,deleteEvent  }


