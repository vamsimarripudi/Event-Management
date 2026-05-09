require("dotenv").config({ path: "./.env" });

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoute");
const feedbackRoute = require("./routes/feedbackRoute");
const adminRoutes = require("./routes/adminRoutes");
const userRoute = require("./routes/userRoute");
const metricRoutes = require("./routes/metricRoutes");
const verifyToken = require("./middleware/token");
const { initMailer } = require("./mailer");
const { setTransporter } = require("./services/emailTransporter");
const { initAI, getAI } = require("./services/aiService");
const metricsMiddleware = require("./middleware/metricMiddleware");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);


app.use(metricsMiddleware)
const io = new Server(server, {
  cors: {
    origin: "https://event.vamsimarripudi.tech",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
});



app.use(express.json());

app.use(
  cors({
    origin: "https://event.vamsimarripudi.tech",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("io", io);



app.use("/api/auth", authRoutes);

app.use("/api/event", eventRoutes);

app.use(
  "/api/registration",
  registrationRoutes
);

app.use("/api/feedback", feedbackRoute);

app.use("/api/admin", adminRoutes);

app.use("/api", userRoute);

app.use(
  "/api/admin/metrics",
  metricRoutes
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/test-ai", async (req, res) => {
  const { message } = req.body;

  try {
    const client = getAI();

    const response =
      await client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    res.json({
      message:
        response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get(
  "/api/secret",
  verifyToken,
  (req, res) => {
    try {
      res.json({
        message:
          "This is a secret message for authenticated users only",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

app.use((err, req, res, next) => {
  if (err.message.includes("Only")) {
    return res.status(400).json({
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    message: "Server Error",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    console.log("Database Connected");

    const transporter =
      await initMailer();

    setTransporter(transporter);

    console.log("AI is Getting Ready");

    await initAI();

    console.log("AI is Here..");

    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (err) {
    console.error(
      "Startup failed:",
      err
    );

    process.exit(1);
  }
};

startServer();