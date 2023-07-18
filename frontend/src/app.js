require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 1818 || process.env.PORT;
//const PORT = process.env.PORT || 9999;

app.use(express.static("public"));

app.listen(PORT, ()=>{
    console.log("frontend listening on port:", PORT);
});