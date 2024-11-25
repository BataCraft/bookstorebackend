const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


 const mongoose_db = process.env.DATABASE

 const db = async (req, res) => {
    try {

        await mongoose.connect(mongoose_db);
        console.log("MongoDB connected successfully.");
        
    } catch (error) {
        console.log(error);
        
        
    }
 };

 module.exports = db;