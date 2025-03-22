require('dotenv').config();
const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => { 
    if (database) {
        console.log('⚠️ Database is already initialized!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db("project1"); // ✅ Use actual database name
            console.log('✅ Connected to MongoDB');
            callback(null, database);
        })
        .catch((err) => {
            console.error('❌ Connection Error:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('❌ Database not initialized');
    }
    return database; // ✅ Returns the actual database instance
};

module.exports = { initDb, getDatabase };
