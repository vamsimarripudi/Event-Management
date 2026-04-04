const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoute");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.get("/", (req,res) => {
    res.send("Welcome to the Event Management API");
}); 
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/registration", registrationRoutes);


connectDB();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
});