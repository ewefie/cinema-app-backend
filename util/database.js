const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;

const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
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

exports.mongoConnect = mongoConnect
