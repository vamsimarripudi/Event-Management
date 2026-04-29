require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoute");
const feedbackRoute = require("./routes/feedbackRoute");
const verifyToken = require("./middleware/token");

require("dotenv").config({path:"./.env"});

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
}); 
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/user/", feedbackRoute);
app.get("/api/test", (req,res) => {
    res.json({message:"API is working"})
});

app.get("/api/secret", (req,res) => {
    res.json({message:"This is a secret message"})
}
);

app.get("/api/secret", verifyToken, (req,res) => {
    try{
        res.json({message:"This is a secret message for authenticated users only"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

});



connectDB();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
});
