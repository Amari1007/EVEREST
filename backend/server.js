require("dotenv").config();
const {runMain,runMongo} = require("./data.js");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8888;

//const PORT = process.env.PORT || 8888;

app.use(cors({origin:"*"}));
//app.use(_tracker);

const test_data = {
    header:"Ghambi signs for Real Madrid",
    body:"Will wear number 5...",
    source:"James Pearce",
    date:new Date().getTime(),
}

const response = async ()=>{
    const response = await runMongo(test_data);
    console.log(response.DB_Message);
}

response();

app.get("/backend/api", (req, res)=>{
    res.json(test_data);
});

app.listen(PORT, ()=>{
    console.log("backend listening on port:", PORT);
});

function _tracker(req, res, next){
    console.log(`request from ip: ${req.ip}://${req.hostname}:${PORT}${req.originalUrl}`);
    next();
}