require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User");
const HoldingsModel = require("./Models/Holdings");
const PositionsModel = require("./Models/Positions");
const Orders = require("./Models/Orders");

const app = express();
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URL;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://stock-hive-8ifi.vercel.app",
      "https://stock-hive-dashboard.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: "stockhive-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: URL }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(URL)
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.error("❌ DB error:", err));

app.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ success: false, message: err });
      res.json({ success: true, message: "User registered", user: registeredUser });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, message: "Logged in successfully", user: req.user });
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ success: false, message: err });
    res.json({ success: true, message: "Logged out" });
  });
});

app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/allHoldings", async (req, res) => {
  res.json(await HoldingsModel.find({}));
});

app.get("/allPositions", async (req, res) => {
  res.json(await PositionsModel.find({}));
});

app.get("/allOrders", async (req, res) => {
  res.json(await Orders.find({}));
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new Orders(req.body);
  await newOrder.save();
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
