const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

const serviceAccount = path.join(__dirname, './serviceAccountKey.json');
const db = new Firestore({
  projectId: 'submissionmlgc-arif',
  keyFilename: serviceAccount,
});

// Fungsi untuk menyimpan data prediksi ke Firestore
async function storeData(id, data) {
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

// Fungsi untuk mengambil seluruh riwayat prediksi
async function getHistories() {
  const predictCollection = db.collection('predictions');
  const snapshot = await predictCollection.get();
  const histories = [];

  snapshot.forEach(doc => {
    histories.push({
      id: doc.id,
      history: doc.data(),
    });
  });

  return histories;
}

module.exports = { storeData, getHistories };
