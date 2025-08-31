const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");


const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3001"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
};
app.use(cors(corsOptions));

// database connection
const {mongoDB}= require("./config/mongodb");
mongoDB();

// api_call
const user = require("./route/user/allroutes");
const admin = require("./route/admin/allroutes");


//api
app.use("/api/admin",admin)
app.use("/api/user",user)


const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});