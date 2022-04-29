const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors("localhost:3000"));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import fungsi dari file algo.js
const algo = require('./algo');
const isDNAValid = algo.isDNAValid;
const KMPMatching = algo.KMPMatching;
const BMMatching = algo.BMMatching;
const pisahinQuery = algo.pisahinQuery;

// Load database
require('./utils/db');
const jenisPenyakit = require('./model/jenisPenyakit');
const hasilPrediksi = require('./model/hasilPrediksi');
const datajenispenyakit = mongoose.model('jenisPenyakit');
const datahasilprediksi = mongoose.model('hasilPrediksi');

// Untuk mendapatkan tanggal sekarang
function tanggalsekarang() {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '/' + mm + '/' + yyyy;

    return today;    
}

// dapetin semua data hasil prediksi penyakit
app.get('/api/hasilPrediksi', (req, res) => {
    datahasilprediksi.find().then(hasilPrediksi => {
        res.send(hasilPrediksi);
    });
});

// dapetin semua data penyakit
app.get('/api/jenisPenyakit', (req, res) => {
    datajenispenyakit.find().then(jenisPenyakit => {
        res.send(jenisPenyakit);
    });
});

// menambahkan data penyakit
app.post('/tambahPenyakit', (req, res) => {
    const namapenyakit = req.body.namaPenyakit;
    const rantaiDNA = req.body.rantaiDNA;

    var isValid = new Boolean(isDNAValid(rantaiDNA));
    if (isValid == true) {
        const newPenyakit = new jenisPenyakit({
            namaPenyakit: namapenyakit,
            rantaiDNA: rantaiDNA
        });
        newPenyakit.save().then(penyakit => {
            res.json({
                penyakit,
                message : "Data penyakit berhasil ditambahkan!"
            });
            console.log("sukses menambahkan data penykit baru");
        });
    } else {
        res.json({
            message: 'Rantai DNA tidak valid'
        });
    }
});

// query penyakit berdasarkan nama penyakit dan atau tanggal
app.post('/queryPenyakit', (req, res) => {
    const inputUser = req.body.input;
    const hasilregex = pisahinQuery(inputUser);
    const tanggal = hasilregex[0];
    const penyakit = hasilregex[1];

    if (penyakit != '' & tanggal != '-1') {
        datahasilprediksi.find({
            "penyakitPrediksi" : {$regex: penyakit, $options: 'i'}, 
            "tanggalPrediksi" : {$regex: tanggal, $options: 'i'}
        }).then(hasilprediksi => {
            res.send({
                hasilprediksi,
                message: hasilprediksi.length + " Data penyakit berhasil ditemukan!"
            });
        });
    } else if (penyakit != '') {
        datahasilprediksi.find({
            "penyakitPrediksi" : {$regex: penyakit, $options: 'i'}
        }).then(hasilprediksi => {
            res.send({
                hasilprediksi,
                message: hasilprediksi.length + " Data penyakit berhasil ditemukan!"
            });
        });
    } else if (tanggal != '-1') {
        datahasilprediksi.find({
            "tanggalPrediksi" : {$regex: tanggal, $options: 'i'}
        }).then(hasilprediksi => {
            res.send({
                hasilprediksi,
                message: hasilprediksi.length + " Data penyakit berhasil ditemukan!"
            });
        });
    } else {
        res.json({
            hasilprediksi : [],
            message: 'Tidak ada hasil prediksi'
        });
    }
});

// tes DNA
app.post('/tesDNA', (req, res) => {
    const DNA = req.body.DNA;
    const namaPengguna = req.body.namaPengguna;
    const prediksiPenyakit = req.body.prediksiPenyakit;    
    const algo = req.body.algo;

    datajenispenyakit.findOne({'namaPenyakit' : prediksiPenyakit}).then(
        (penyakit) => {
            var rantaiDNAPrediksiPenyakit = penyakit.rantaiDNA;
            if (isDNAValid(DNA)) {
                var hasil = false;
                if (algo == 'KMP') {
                    hasil = Boolean(KMPMatching(DNA, rantaiDNAPrediksiPenyakit));
                } else {
                    hasil = Boolean(BMMatching(DNA, rantaiDNAPrediksiPenyakit));
                }
                const newhasilPrediksi = new hasilPrediksi({
                    tanggalPrediksi: tanggalsekarang(),
                    namaPasien: namaPengguna,
                    penyakitPrediksi: prediksiPenyakit,
                    statusTerprediksi: hasil
                });
                newhasilPrediksi.save().then(hasilprediksi => {
                    // console.log("sukses menambahkan data hasil prediksi");
                    res.json({
                        message : namaPengguna + " - " + tanggalsekarang() + " - " + prediksiPenyakit + " - " + hasil
                    });
                });
            }
            else {
                // console.log("DNA tidak valid");
                res.json({
                    message: 'Rantai DNA tidak valid'
                });
            }
        }
    ).catch (function(err) {
        // console.log("prediksi penyakit tidak ditemukan");
        res.json({
            message: 'Prediksi penyakit tidak ada di database'
        });
        console.log(err);
    });
}); 

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
