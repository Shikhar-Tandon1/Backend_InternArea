const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 databaseURL: 'test.firebaseio.com'
});

module.exports = { admin };