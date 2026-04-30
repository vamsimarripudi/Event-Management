const mongoose = require("mongoose");
const {getSecret} = require("./services/ec2Services");



const connectDB = async() => {
    try{
        const MONGO_URI = await getSecret("/event-api/MONGO_URL")
        await mongoose.connect(MONGO_URI);
        
        console.log("Database Connected")

    }catch(error){
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB;