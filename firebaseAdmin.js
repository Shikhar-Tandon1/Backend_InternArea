const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const url=DATABASE

app.use(cors());
app.use(bodyParser.json());

let loginHistory = []; // This would typically be a database in production

app.post('/login', (req, res) => {
  const { userId, systemInfo } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const loginEntry = {
    userId,
    systemInfo,
    ip,
    timestamp: new Date()
  };

  loginHistory.push(loginEntry); // Store in the database in production
  res.status(200).json({ message: 'Login recorded', loginEntry });
});

app.get('/login-history/:userId', (req, res) => {
  const { userId } = req.params;
  const history = loginHistory.filter(entry => entry.userId === userId);
  res.status(200).json({ history });
});

app.listen(url, () => {
  console.log(`Server running`);
});