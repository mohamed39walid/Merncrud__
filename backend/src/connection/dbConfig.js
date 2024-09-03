const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://crud_operation_mern:Mern123@merncrud.rgveawz.mongodb.net/?retryWrites=true&w=majority&appName=merncrud');
        console.log("connected to database successfully!");
    } catch (error) {
        console.error("error in db connection: ", error.message);
    }
};

module.exports = connectDB;
