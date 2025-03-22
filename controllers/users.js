const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase(); // ✅ Correctly get the database instance
        const users = await db.collection('users').find().toArray(); // ✅ Access collection
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
};

const getSingle = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const userId = new ObjectId(req.params.id);
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
};

module.exports = { getAll, getSingle };
