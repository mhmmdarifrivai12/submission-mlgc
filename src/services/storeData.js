const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

const serviceAccount = path.join(__dirname, './serviceAccountKey.json'); 
const db = new Firestore({
  projectId: 'submissionmlgc-arif', 
  keyFilename: serviceAccount,
});

async function storeData(id, data) {
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;
