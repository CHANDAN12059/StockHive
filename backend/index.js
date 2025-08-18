require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const URL = process.env.MONGO_URL;

const HoldingsModel = require("./Models/Holdings");
const PositionsModel = require("./Models/Positions");
const OrderModel = require("./Models/Orders");
const User = require("./Models/User");

const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// --- MIDDLEWARE ---
app.use(cors({
  origin: [
    "https://stock-hive-8ifi.vercel.app",
    "https://stock-hive-dashboard.vercel.app"
  ],
  credentials: true,
}));

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "stockhive-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,      // required if frontend is https
      sameSite: "none",  // allow cross-origin cookies
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- DATABASE CONNECTION ---
async function main() {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("DB Connection Error:", err));

// --- ROUTES ---

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    const data = await PositionsModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const data = await HoldingsModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add new order
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const newOrder = new OrderModel({ name, qty, price, mode });
    await newOrder.save();
    res.json({ success: true, message: "Order saved", order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all orders
app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: "User registered and logged in", user: registeredUser });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, message: "Logged in successfully" });
});

// Logout
app.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// Check authentication
app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// --- SERVER ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
