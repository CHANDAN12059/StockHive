require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");

const User = require("./Models/User");
const HoldingsModel = require("./Models/Holdings");
const PositionsModel = require("./Models/Positions");
const OrderModel = require("./Models/Orders");

const app = express();
const URL = process.env.MONGO_URL;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://stock-hive-8ifi.vercel.app", "https://stock-hive-dashboard.vercel.app"],
    credentials: true,
  })
);

// Session config for cross-origin
app.use(
  session({
    secret: process.env.SESSION_SECRET || "stockhive-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,     // true if using HTTPS in production
      sameSite: "none", // allow cookies across domains
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Routes

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ success: false, message: err });
      res.json({ success: true, message: "User registered and logged in", user: registeredUser });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
    req.login(user, (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: "Logged in successfully", user });
    });
  })(req, res, next);
});

// Logout
app.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// Check auth
app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Data Routes
app.get("/allPositions", async (req, res) => {
  const data = await PositionsModel.find({});
  res.json(data);
});

app.get("/allHoldings", async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new OrderModel(req.body);
  await newOrder.save();
  res.json({ success: true, message: "Order created", order: newOrder });
});

app.get("/allOrders", async (req, res) => {
  const orders = await OrderModel.find({});
  res.json(orders);
});

// Start server
app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080");
});
