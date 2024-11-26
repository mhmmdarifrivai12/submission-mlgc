const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const { storeData, getHistories } = require("../services/storeData");  // Pastikan import ini benar

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  // Menyimpan data prediksi
  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);
  return response;
}

// Handler untuk mengambil riwayat prediksi
async function getHistoriesHandler(request, h) {
  try {
    const histories = await getHistories();  // Mengambil seluruh riwayat prediksi
    return h.response({
      status: "success",
      data: histories,
    }).code(200);
  } catch (error) {
    return h.response({
      status: "fail",
      message: "Gagal mengambil riwayat prediksi",
    }).code(500);
  }
}

module.exports = { postPredictHandler, getHistoriesHandler };
