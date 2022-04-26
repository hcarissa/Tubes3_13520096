const mongoose = require('mongoose');

const jenisPenyakit = new mongoose.model('jenisPenyakit', {
    namaPenyakit : {
        type : String,
        required : true,
    },
    rantaiDNA : {
        type : String,
        required : true,

    },
});

// Menambah satu penyakit baru
// const penyakit1 = new jenisPenyakit({
//     namaPenyakit : 'Penyakit gatal-gatal',
//     rantaiDNA : 'GATA',
// });

// penyakit1.save();

module.exports = jenisPenyakit;