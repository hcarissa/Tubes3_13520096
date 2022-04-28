const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/DNA';
const atlasuri = "mongodb+srv://searchdna:maboktubes@cluster0.lspwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(atlasuri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed');
});