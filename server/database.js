const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/angular-coppel',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Data is conected'))
.catch(err => console.log(err));