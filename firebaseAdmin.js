const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 databaseURL: 'https://console.firebase.google.com/project/intern-area-1b584/database/intern-area-1b584-default-rtdb/data/~2F'
});

module.exports = { admin };