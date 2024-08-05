const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const uri = DATABASEURL; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
  await client.connect();
  console.log('Connected to MongoDB');
};

const db = client.db('test'); 
const loginHistoryCollection = db.collection('loginHistory');

const admin = require('./firebaseAdmin');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


connect();

app.post('/login', async (req, res) => {
  const { userId, systemInfo } = req.body;


  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  try {

    const loginData = {
      systemInfo,
      ip,
      timestamp: new Date()
    };
    await loginHistoryCollection.updateOne(
      { userId },
      { $push: { entries: loginData } },
      { upsert: true }
    );

    res.status(200).json({ message: 'Login recorded', loginData });
  } catch (error) {
    res.status(500).json({ message: 'Error recording login', error });
  }
});

app.get('/login-history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userHistory = await loginHistoryCollection.findOne({ userId });
    const history = userHistory ? userHistory.entries : [];
    
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching login history', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});