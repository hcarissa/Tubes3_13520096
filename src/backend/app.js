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
    // console.log(namapenyakit);
    // console.log(rantaiDNA);
    // const namapenyakit = "tubes stimaaa";
    // const rantaiDNA = "AGCTTTTCAG";

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
    
    // const tanggal = "-1";
    // const penyakit = 'mental';

    if (penyakit != '' & tanggal != '-1') {
        datahasilprediksi.find({
            "penyakitPrediksi" : {$regex: penyakit, $options: 'i'}, 
            "tanggalPrediksi" : {$regex: tanggal, $options: 'i'}
        }).then(hasilprediksi => {
            res.send(hasilprediksi);
        });
    } else if (penyakit != '') {
        datahasilprediksi.find({
            "penyakitPrediksi" : {$regex: penyakit, $options: 'i'}
        }).then(hasilprediksi => {
            res.send(hasilprediksi);
        });
    } else if (tanggal != '-1') {
        datahasilprediksi.find({
            "tanggalPrediksi" : {$regex: tanggal, $options: 'i'}
        }).then(hasilprediksi => {
            res.send(hasilprediksi);
        });
    } else {
        res.json({
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
    // var data = "";

    datajenispenyakit.findOne({'namaPenyakit' : prediksiPenyakit}).then(
        (penyakit) => {
            // this.data = penyakit;
            var rantaiDNAPrediksiPenyakit = penyakit.rantaiDNA;
            const isValid = new Boolean(isDNAValid(DNA));
            if (isValid == true) {
                var hasil = new Boolean;
                if (algo == 'KMP') {
                    hasil = Boolean(KMPMatching(DNA, rantaiDNAPrediksiPenyakit));
                } else if (algo == 'BM') {
                    hasil = Boolean(BMMatching(DNA, rantaiDNAPrediksiPenyakit));
                }
                const newhasilPrediksi = new hasilPrediksi({
                    tanggalPrediksi: tanggalsekarang(),
                    namaPasien: namaPengguna,
                    penyakitPrediksi: prediksiPenyakit,
                    statusTerprediksi: hasil
                });
                newhasilPrediksi.save().then(hasilprediksi => {
                    res.json({
                        // message : hasilprediksi.namaPengguna + " - " + hasilprediksi.tanggalPrediksi + " - " + hasilprediksi.prediksiPenyakit + " - " + hasilprediksi.hasil
                        message : namaPengguna + " - " + tanggalsekarang() + " - " + prediksiPenyakit + " - " + hasil
                    });
                });
            }
            else {
                res.json({
                    message: 'Rantai DNA tidak valid'
                });
            }
        }
    ).catch (function(err) {
        res.json({
            message: 'Prediksi penyakit tidak ada di database'
        });
        console.log(err);
    });
    // console.log(data.rantaiDNA);
    // if (data != null) {
    // } else {
    // }
}); 

// app.post('/search', (req, res) => {
//     // const input = req.body.input;
//     // if (namaPenyakit && tanggal) {
//     //     hasilPrediksi.find({ namaPenyakit, tanggal }).then(hasilPrediksi => {
//     //         res.json(hasilPrediksi);
//     //     });
//     // } else if (namaPenyakit) {
//     //     hasilPrediksi.find({ namaPenyakit }).then(hasilPrediksi => {
//     //         res.json(hasilPrediksi);
//     //     });
//     // } else if (tanggal) {
//     //     hasilPrediksi.find({ tanggal }).then(hasilPrediksi => {
//     //         res.json(hasilPrediksi);
//     //     });
//     // } else {
//     //     // hasilPrediksi.find().then(hasilPrediksi => {
//     //     //     res.json(hasilPrediksi);
//     //     // });
//     //     res.send('tidak ada data');
//     // }

//     const tanggal = "06/04/2022";
//     const namaPenyakit = "Delores Priscott";
//     datahasilprediksi.find({ "namaPenyakit" : namaPenyakit, "tanggal" : tanggal }).then(hasilPrediksi => {
//         res.json(hasilPrediksi);
//     });
// });




// // tes DNA
// app.post('/tesDNA', (req, res) => {
//     const namaPengguna = req.body.namaPengguna;
//     const seqDNA = req.body.seqDNA;
//     const prediksiPenyakit = req.body.prediksiPenyakit;
//     const tanggal = Date.now();

//     const datapenyakit = jenisPenyakit.find().toArray();
//     var prediksiPenyakitExist = datapenyakit.includes(prediksiPenyakit);

//     var isValid = new Boolean(isDNAValid(seqDNA));
//     if (isValid && prediksiPenyakitExist) {
//         //
//     } 
// });


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

app.post('/testis', (req, res) => {
    console.log(req.body); 
    console.log(req.body.namaPengguna);
   
    // lu requestnya pake yg www-form
    // const namaPengguna = req.body.namaPengguna;
    // const rantaiDNA = req.body.rantaiDNA;
    // const valid = new Boolean(isDNAValid(rantaiDNA));
    // if (valid) {
    //     res.send({
    //         'message': 'valid',
    //         'rantaiDNA' : rantaiDNA,
    //         'nama' : namaPengguna
    //     })
    // } else {
    //     res.send({
    //         'message': 'invalid',
    //         'rantaiDNA' : rantaiDNA,
    //         'nama' : namaPengguna
    //     })
    // }
});

app.get('/testis', (req, res) => {
    let today = tanggalsekarang();
    console.log(today);
    res.send(today);
});




app.post('/cobaquery', (req, res) => {
    const tanggal = "06/04/2022";
    const penyakit = "ngantuk";
    datahasilprediksi.find({
         "penyakitPrediksi" : {$regex: penyakit, $options: 'i'}, 
         "tanggalPrediksi" : {$regex: tanggal, $options: 'i'} 
        })
        .then(hasilPrediksi => {
        res.json(hasilPrediksi);
    });

//     datahasilprediksi.find({
        
//     })
//        .then(hasilPrediksi => {
//        res.json(hasilPrediksi);
//    });
});


app.post("/coba", (req, res) => {
    const penyakit = "Maag";
    var data = "";
    datajenispenyakit.findOne(
        {
            "namaPenyakit" : penyakit
        }
    ).then(hasil => {
        this.data = hasil.rantaiDNA;
        console.log(this.data);
        console.log(hasil);
    });
    console.log(this.data);
    res.send(this.data);
});