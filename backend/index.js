require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User");

const HoldingsModel = require("./Models/Holdings");
const PositionsModel = require("./Models/Positions");
const OrderModel = require("./Models/Orders");

const app = express();

// --- CORS ---
app.use(cors({
  origin: [
    "https://stock-hive-8ifi.vercel.app",
    "https://stock-hive-dashboard.vercel.app"
  ],
  credentials: true
}));

app.use(bodyParser.json());

// --- Sessions for cross-domain login ---
app.use(session({
  secret: "stockhive-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,       // must be true for HTTPS
    httpOnly: true,
    sameSite: "none"    // allow cookies across domains
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// --- Routes ---
app.get("/allPositions", async (req, res) => {
  const data = await PositionsModel.find({});
  res.json(data);
});

app.get("/allHoldings", async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new OrderModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode
  });
  await newOrder.save();
  res.json({ success: true, message: "Order created" });
});

app.get("/allOrders", async (req, res) => {
  const orders = await OrderModel.find({});
  res.json(orders);
});

// --- Signup ---
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ success: false, message: err });
      res.json({ success: true, message: "User registered and logged in", user: registeredUser });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Login ---
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!user) return res.status(401).json({ success: false, message: info.message });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ success: false, message: err });
      res.json({ success: true, message: "Logged in successfully", user });
    });
  })(req, res, next);
});

// --- Logout ---
app.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ success: false, message: "Error logging out" });
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// --- Check auth ---
app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
