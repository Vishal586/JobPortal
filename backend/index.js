import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import companyRoute from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS config for frontend (Vite default port 5173)
app.use(cors({
  origin: 'https://job-portal123245.netlify.app',
  credentials: true
}));


// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/application", applicationRoute);

// Start the server after DB connects
app.listen(PORT, async () => {
    await connectDB();
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend API is running...");
});
