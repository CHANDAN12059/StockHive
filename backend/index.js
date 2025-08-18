require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const URL = process.env.MONGO_URL;
const HoldingsModel = require("./Models/Holdings");
const PositionsModel = require("./Models/Positions");
const OrderModel=require("./Models/Orders");
const cors=require("cors");
const bodyParser=require("body-parser");
const Orders = require("./Models/Orders");
const session = require("express-session");
const passport=require("passport");
const localStrategy = require("passport-local");
const User=require("./Models/User");



app.use(cors({
  origin: ["https://stock-hive-8ifi.vercel.app", "https://stock-hive-dashboard.vercel.app"],

  credentials: true
}));

app.use(bodyParser.json());
app.use(
  session({
    secret: "stockhive-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,  
      sameSite: "none" 
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
  await mongoose.connect(URL);
}

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });









app.get("/allPositions", async (req, res) => {
  let data = await PositionsModel.find({});

  res.json(data);
});

app.get("/allHoldings", async (req, res) => {
  let data = await HoldingsModel.find({});

  res.json(data);
});


app.post("/newOrder",(req,res)=>{

let newOrder=new OrderModel({


  name:req.body.name,
  qty:req.body.qty,
  price:req.body.price,
  mode:req.body.mode

});



newOrder.save();

})


app.get("/allOrders",async(req,res)=>{
  let orders=await Orders.find({});

res.json(orders);


})




app.post("/signup",async(req,res)=>{

let {username,email,password}=req.body;
const newUser=new User({
  email,username
});

const registeredUser=await User.register(newUser,password);
req.login(registeredUser, (err) => {
  if (err) return res.status(500).json({ success: false, message: err });
  res.json({ success: true, message: "User registered and logged in", user: registeredUser });
});

})



app.post("/login",passport.authenticate("local"),(req,res)=>{
  res.json({ success: true, message: "Logged in successfully" });
})


app.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: "Error logging out" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
});


app.get("/checkAuth",(req,res)=>{
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
})

app.listen(8080, (req, res) => {
  console.log("Listening at port 8080");
});
