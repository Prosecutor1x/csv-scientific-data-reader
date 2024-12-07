const admin = require("firebase-admin");


const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:"cloud-functions-tutorial-69027.firebasestorage.app",
});


const firestore = admin.firestore();
const db = admin.storage();

module.exports = {db,firestore}