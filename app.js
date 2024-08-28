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

// Import necessary modules
const jwt = require("jsonwebtoken");

// Refresh Token API
app.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if the refresh token is expired
    const now = Math.floor(Date.now() / 1000);

    // Generate a new access token with the same user ID
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m", // Set the expiration time for the new access token
      }
    );

    // Return the new access token
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Refresh token expired, please log in again" });
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
