const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { db } = require('./firebaseAdmin');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { userId, systemInfo } = req.body;

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  try {

    const loginRef = db.collection('loginHistory').doc(userId);
    const loginData = {
      systemInfo,
      ip,
      timestamp: new Date()
    };
    await loginRef.collection('entries').add(loginData);

    res.status(200).json({ message: 'Login recorded', loginData });
  } catch (error) {
    res.status(500).json({ message: 'Error recording login', error });
  }
});

app.get('/login-history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const loginRef = db.collection('loginHistory').doc(userId);
    const snapshot = await loginRef.collection('entries').get();
    const history = snapshot.docs.map(doc => doc.data());
    
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching login history', error });
  }
});
const url=DATABASE
app.listen(url, () => {
  console.log(`Server running at http://localhost:${port}`);
});