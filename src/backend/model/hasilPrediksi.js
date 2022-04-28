const mongoose = require('mongoose');

const hasilPrediksi = new mongoose.model('hasilPrediksi', {
    tanggalPrediksi : {
        type : String,
        required : true
    },
    namaPasien : {
        type : String,
        required : true
    },
    penyakitPrediksi : {
        type : String,
        required : true
    },
    statusTerprediksi : {
        type : String
    },
});

module.exports = hasilPrediksi;