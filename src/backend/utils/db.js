const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/DNA', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed');
});