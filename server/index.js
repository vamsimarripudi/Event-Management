require("dotenv").config({path:"./.env"});
const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoute");
const feedbackRoute = require("./routes/feedbackRoute");
const verifyToken = require("./middleware/token");
const {initMailer} = require("./mailer");
const {setTransporter} = require("./services/emailTransporter");
const {initAI} = require("./services/aiService");
const {getAI} = require("./services/aiService");
const adminRoutes = require("./routes/adminRoutes");
const userRoute = require("./routes/userRoute");


const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/feedback", feedbackRoute);
app.use("/api/admin", adminRoutes);
app.use("/api", userRoute);


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
}); 
app.get("/api/test", (req,res) => {
    res.json({message:"API is working"})
});

app.get("/api/test-ai", async (req, res) => {
  const {message} = req.body;
  try {
    const client = getAI();

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({
      message: response.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/secret", verifyToken, (req,res) => {
    try{
        res.json({message:"This is a secret message for authenticated users only"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

});

app.use((err, req, res, next) => {
  if (err.message.includes("Only")) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: "Server Error" });
});


const startServer = async () => {
  try {
{/*----------------------------------------------*/}

    
    await connectDB();
    

{/*----------------------------------------------*/}

    
    const transporter = await initMailer();
   

{/*----------------------------------------------*/}

    setTransporter(transporter);
    

{/*----------------------------------------------*/}

    console.log("AI is Getting Ready");
    await initAI()
    console.log("AI is Here..");

{/*----------------------------------------------*/}

    
    app.listen(PORT, () => {
      console.log("Server running on port 5000");
    });

{/*----------------------------------------------*/}

  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();
