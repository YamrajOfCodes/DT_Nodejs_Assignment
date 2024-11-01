const { getDb } = require("../Db/Connection");

// Function to get the 'events' collection
function getEventCollection() {
    const db = getDb(); // Get the database instance
    return db.collection("events");
}

// Export the collection getter
module.exports =  getEventCollection ;