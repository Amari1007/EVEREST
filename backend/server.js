require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8888;

//const PORT = process.env.PORT || 8888;

app.use(cors({origin:"*"}));
//app.use(_tracker);

app.get("/backend/api", (req, res)=>{
    res.json({name:"chaupi ghambi"});
});

app.listen(PORT, ()=>{
    console.log("backend listening on port:", PORT);
});

function _tracker(req, res, next){
    console.log(`request from ip: ${req.ip}://${req.hostname}:${PORT}${req.originalUrl}`);
    next();
}