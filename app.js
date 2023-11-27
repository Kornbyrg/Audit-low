const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


// MongoDB connection string
const mongoConnectionString = 'mongodb+srv://pshotkin12:4LLmejS7gowqOiml@audit-low.5lqch56.mongodb.net/?retryWrites=true&w=majority';


// Middleware to parse JSON in the request body
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle network information
app.post('/networkInfo', async (req, res) => {
  const networkInfo = req.body;

  let client;

  try {
    if (!mongoConnectionString) {
      console.error('MongoDB connection string is not provided.');
      process.exit(1); // Exit the process if the connection string is missing
    }
    // Connect to MongoDB
    client = new MongoClient(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Audit-low'); // Replace with your actual database name
    const collection = database.collection('Audit-low'); // Replace with your actual collection name

    // Insert the networkInfo document into the collection
    const result = await collection.insertOne(networkInfo);
    console.log(`Document inserted with _id: ${result.insertedId}`);

    // Respond with a success message
    res.status(201).json({ message: 'Network information saved successfully' });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection if it was opened
    if (client) {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
