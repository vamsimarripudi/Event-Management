const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);

connectDB();

app.listen(5000, async () => {
    console.log("Server is running on port 5000");
    
});