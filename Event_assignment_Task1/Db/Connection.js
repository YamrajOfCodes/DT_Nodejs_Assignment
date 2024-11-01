const {MongoClient} = require("mongodb");

const databaseUrl = process.env.DATABASE; 





let client;
let db;

// Async function to initialize the database connection
async function dbConnect() {
    client = new MongoClient(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db("Event");
    console.log("Database connected successfully");
}

// Function to get the database object once it's connected
function getDb() {
    if (!db) {
        throw new Error("Database not initialized. Call initializeDb first.");
    }
    return db;
}

// Export the initializeDb function and getDb helper function
module.exports = { dbConnect, getDb };
