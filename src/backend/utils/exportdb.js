
// require('./db');

// const atlasuri = "mongodb+srv://searchdna:maboktubes@cluster0.lspwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const {spawn} = require('child_process');
// spawn('mongodump', [`--uri=${atlasuri}`, `--collection:${'hasilPrediksi'}`, '--out=./backup/']);

// spawn('mongodump', [`--uri=${atlasuri}`, `--collection:${'jenisPenyakit'}`, '--out=./backup/']);

const atlasuri = "mongodb+srv://searchdna:maboktubes@cluster0.lspwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dbName = 'myFirstDatabase';
const client = new MongoClient(atlasuri, { useUnifiedTopology:true });

client.connect(function(err) {
    //assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const collection1 = 'hasilprediksis';
    const collection2 = 'jenispenyakits';

    getDocuments(db, collection1, function(docs) {
    
        console.log('Closing connection.');
        client.close();
        
        // Write to file
        try {
            fs.writeFileSync('../dataexport/dataprediksi.json', JSON.stringify(docs));
            console.log('Done writing to file.');
        }
        catch(err) {
            console.log('Error writing to file', err);
        }
    });
});

client.connect(function(err) {
    //assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const collection1 = 'hasilprediksis';
    const collection2 = 'jenispenyakits';

    getDocuments(db, collection2, function(docs) {
    
        console.log('Closing connection.');
        client.close();
        
        // Write to file
        try {
            fs.writeFileSync('../dataexport/datapenyakit.json', JSON.stringify(docs));
            console.log('Done writing to file.');
        }
        catch(err) {
            console.log('Error writing to file', err);
        }
    });
});

const getDocuments = function(db, collection, callback) {
    const query = { };  // this is your query criteria
    db.collection(collection)
      .find(query)
      .toArray(function(err, result) { 
          if (err) throw err; 
          callback(result); 
    }); 
}

// client.connect(function(err) {
//     console.log('Connected successfully to server');
// });

// const db = client.db(dbName);

// const collection1 = 'hasilprediksis';
// const collection2 = 'jenispenyakits';

// getDocuments(db, collection1, function(docs) {

//     // console.log('Closing connection.');
//     // client.close();
    
//     // Write to file
//     try {
//         fs.writeFileSync('../dataexport/dataprediksi.json', JSON.stringify(docs));
//         console.log('Done writing to file.');
//     }
//     catch(err) {
//         console.log('Error writing to file', err);
//     }
// });

// getDocuments(db, collection2, function(docs) {

//     console.log('Closing connection.');
//     client.close();
    
//     // Write to file
//     try {
//         fs.writeFileSync('../dataexport/datapenyakit.json', JSON.stringify(docs));
//         console.log('Done writing to file.');
//     }
//     catch(err) {
//         console.log('Error writing to file', err);
//     }
// });