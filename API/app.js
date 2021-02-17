const http = require('http');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./routes/user");
const patients = require("./routes/patients");
const Case = require("./routes/case");
const cors=require('cors');
const { verify } = require('crypto');
const jwt = require("jsonwebtoken");
const User = require("./model/User");
const auth = require("./middleware/auth");

// PORT
const PORT = 4000;
   
// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/isLoggedIn", auth , (req, res) => {
  res.json("Authorized");
});

app.get('/getUser', auth, async (req,res)=>{
  try {
    const user = await User.find();
    res.json(user);
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching user" });
  }
});

app.use("/user", user);
app.use("/patients", patients);
app.use("/case", Case);

//How to we start listening to the server
app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

//Connect To DB
const MONGOURI = "mongodb+srv://sanskar:Yu3GA3nucej5zb5@cluster0.cx6ep.mongodb.net/ClinicalSystem";

mongoose.connect(MONGOURI, { useNewUrlParser: true }, () =>{
    console.log("Connected to DB !!");
});


