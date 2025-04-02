const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://outfloai.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
}));

app.use(express.json());

connectDB();

const campaignRoutes = require("./routes/campaignRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/campaigns", campaignRoutes);
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
