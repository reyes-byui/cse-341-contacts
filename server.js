const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://cse-341-contacts:OihzVjIIxQy13FFq@cluster0.qwwf8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true";

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () => {
        console.log(`Database is listening and node is running on port ${PORT}`)});
    }
});

app.get('/test-db-connection', async (req, res) => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    res.status(200).send('Database connection successful');
    await client.close();
  } catch (error) {
    res.status(500).send('Database connection failed: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});