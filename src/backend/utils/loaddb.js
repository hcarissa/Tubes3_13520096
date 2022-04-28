// const { json } = require('body-parser');
// const fs = require('fs');

// try {
//   var data = fs.readFileSync('./datapenyakit.json', );
// //   JSON.parse(data);
// //   for (var penyakit of data) {
// //     console.log(penyakit);
// //     console.log("===");
// //   }
//     console.log(data.length);
// } catch (err) {
//   console.error(err);
// }

const mongoose = require('mongoose');
require('./utils/db');
var datapenyakitjson = require('./datapenyakit.json');
var dataprediksijson = require('./dataprediksi.json');

const datajenispenyakit = mongoose.model('jenisPenyakit');
const datahasilprediksi = mongoose.model('hasilPrediksi');

datahasilprediksi.insertMany(dataprediksijson, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("berhasil menambahkan data hasil prediksi");
    }
});

datajenispenyakit.insertMany(datapenyakitjson, function(err){
    if(err) { 
        console.log(err);
    } else {
          console.log("berhasil menambahkan data penyakit");
    }
});