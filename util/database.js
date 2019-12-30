const mongoose = require('mongoose');

const DB_USERNAME = 'cinemaUser';
// const DB_USERNAME = 'admin';

const DB_PASS = 'bpabjXmLd9jpY9vY';
// const DB_PASS = 'sKqC8UQ6aKUzTMFS';
const DB_NAME = 'cinema';
// mongodb+srv://<username>:<password>@learningcluster-cru14.mongodb.net/test?retryWrites=true&w=majority
const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@learningcluster-cru14.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const mongoConnect = callback => {
    mongoose.connect(DB_URI, DB_OPTIONS)
        .then(() => {
            callback();
            console.log("Connected")
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.mongoConnect = mongoConnect;
