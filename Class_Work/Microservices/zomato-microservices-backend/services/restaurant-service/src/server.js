require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.json({
    service: "restaurant-service",
    status: "OK"
  });
});

// Get All Restaurants
app.get("/api/restaurants", (req, res) => {
  res.json({
    message: "Restaurant Service is working",
    restaurants: []
  });
});

// Get Restaurant By ID
app.get("/api/restaurants/:id", (req, res) => {
  res.json({
    message: "Restaurant fetched successfully",
    restaurantId: req.params.id
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});