const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://outfloai.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
const campaignRoutes = require("./routes/campaignRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/campaigns", campaignRoutes);
app.use("/api", messageRoutes);

// Basic health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));