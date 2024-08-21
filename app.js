const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
