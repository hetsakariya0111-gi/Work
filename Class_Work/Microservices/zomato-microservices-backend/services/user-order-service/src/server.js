require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.json({
    service: "user-order-service",
    status: "OK"
  });
});

// Auth Route
app.get("/api/auth", (req, res) => {
  res.json({
    message: "Auth Service is working"
  });
});

// Orders Route
app.get("/api/orders", (req, res) => {
  res.json({
    message: "Order Service is working",
    orders: []
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`User + Order Service running on port ${PORT}`);
});