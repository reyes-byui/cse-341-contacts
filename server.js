const express = require('express');
const mongodb = require('./data/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Ensure JSON parsing is enabled

// Test database connection
app.get('/test-db-connection', async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const collections = await db.listCollections().toArray(); // Fetch collection names
        res.status(200).json({ message: "✅ Database Connected", collections });
    } catch (error) {
        res.status(500).json({ message: "❌ Connection Error", error });
    }
});

app.use('/', require('./routes')); // Ensure other routes are registered

mongodb.initDb((err) => {
    if (err) {
        console.error("❌ Error initializing database:", err);
    } else {
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    }
});
