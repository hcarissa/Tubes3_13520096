const express = require('express');
const app = express();

// import fungsi dari file algo.js
const algo = require('./algo');
const isDNAValid = algo.isDNAValid;
const KMPMatching = algo.KMPMatching;
const BMMatching = algo.BMMatching;

// Load database
require('./utils/db');
const jenisPenyakit = require('./model/jenisPenyakit');
const hasilPrediksi = require('./model/hasilPrediksi');


// dapetin semua data hasil prediksi penyakit
app.get('api/hasilPrediksi', (req, res) => {
    hasilPrediksi.find().then(hasilPrediksi => {
        res.send(hasilPrediksi);
    });
});

// dapetin semua data penyakit
app.get('api/jenisPenyakit', (req, res) => {
    jenisPenyakit.find().then(jenisPenyakit => {
        res.send(jenisPenyakit);
    });
});

// query penyakit berdasarkan nama penyakit dan atau tanggal
app.get('/search', (req, res) => {
    const { namaPenyakit, tanggal } = req.body;
    if (namaPenyakit && tanggal) {
        hasilPrediksi.find({ namaPenyakit, tanggal }).then(hasilPrediksi => {
            res.json(hasilPrediksi);
        });
    } else if (namaPenyakit) {
        hasilPrediksi.find({ namaPenyakit }).then(hasilPrediksi => {
            res.json(hasilPrediksi);
        });
    } else if (tanggal) {
        hasilPrediksi.find({ tanggal }).then(hasilPrediksi => {
            res.json(hasilPrediksi);
        });
    }
});

// menambahkan data penyakit
app.post('/TambahPenyakit', (req, res) => {
    const namapenyakit = req.body.namapenyakit;
    const rantaiDNA = req.body.rantaiDNA;
    var isValid = new Boolean(isDNAValid(rantaiDNA));
    if (isValid) {
        const newPenyakit = new jenisPenyakit({
            namaPenyakit: namapenyakit,
            rantaiDNA: rantaiDNA
        });
        newPenyakit.save().then(penyakit => {
            res.json(penyakit);
        });
    } else {
        res.json({
            message: 'Rantai DNA tidak valid'
        });
    }
});


// tes DNA
app.post('/tesDNA', (req, res) => {
    const namaPengguna = req.body.namaPengguna;
    const seqDNA = req.body.seqDNA;
    const prediksiPenyakit = req.body.prediksiPenyakit;
    const tanggal = Date.now();

    const datapenyakit = jenisPenyakit.find().toArray();
    var prediksiPenyakitExist = datapenyakit.includes(prediksiPenyakit);

    var isValid = new Boolean(isDNAValid(seqDNA));
    if (isValid && prediksiPenyakitExist) {
        //
    }
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});


// //  frontend
// const namapengguna

// axios.post('/prediksiPenyakit', {
//     namapengguna : <namapenggunadisini>
//     rantaiDNA : <rantaidnadisini>
//     prediksipenyakit : <namapenyakit>
//     }).then((response) => {
//     // di sini nanti ditampilin hasilnya
// });


// app.post('/prediksipenyakit' (req, res) => {
//     const namaPengguna = req.body.namaPengguna;
//     const seqDNA = req.body.seqDNA;
//     const prediksiPenyakit = req.body.prediksiPenyakit;
   
//     // algo disini

//    res.send(hasil)
// })