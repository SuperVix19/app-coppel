const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:DAfMTwHnIcGF3SDz@app-coppel.tvs9gf0.mongodb.net/?retryWrites=true&w=majority')
.then(db => console.log('Data is conected'))
.catch(err => console.log(err));