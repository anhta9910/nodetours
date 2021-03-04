const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});
const Tour = require('./../../models/tourModel');
const { dirname } = require('path');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(() =>{
        console.log('DB connection successfully');
    });

    // READ JSON FILE


const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


    // IMPORT DATA INTO DB
const importData = async () => {
    try {
        await  Tour.create(tours);
        console.log(' data successfully loaded!')
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// Delete all data from DB
const deleteDate = async () => {
    try {
        await Tour.deleteMany();
        console.log('deleted');
    } catch (err) {
        console.log(err)
    }
    process.exit();
}

if(process.argv[2]=== '--import') {
    importData();
} else if (process.argv[2]==='--delete') {
    deleteDate();
}

console.log(process.argv);