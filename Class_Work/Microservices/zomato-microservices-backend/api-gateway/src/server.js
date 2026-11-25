require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  createProxyMiddleware
} = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    service: "api-gateway",
    status: "OK"
  });
});

// User + Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.USER_ORDER_SERVICE_URL,
    changeOrigin: true,
  })
);

// Order Service
app.use(
  "/api/orders",
  createProxyMiddleware({
    target: process.env.USER_ORDER_SERVICE_URL,
    changeOrigin: true
  })
);

// Restaurant Service
app.use(
  "/api/restaurants",
  createProxyMiddleware({
    target: process.env.RESTAURANT_SERVICE_URL,
    changeOrigin: true
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});