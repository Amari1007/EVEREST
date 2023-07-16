//comparison is the thief pf joy :D

require("dotenv").config();
const {runMain,runInsertMongo,runGetMongo} = require("./data.js");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8888;
//const PORT = process.env.PORT || 8888;

app.use(cors({origin:"*"}));
//app.use(_tracker);

/*const test_data = {
    header:"Ghambi signs for Real Madrid",
    body:"Will wear number 5...",
    source:"James Pearce",
    date:new Date().getTime(),
}*/

app.get("/backend/api/tableData", async (req, res)=>{    
    const param = {body:"body1",header:"header1"};
    const db_res = await runGetMongo(param);

    if(db_res.success){//if opp success
        res.json({db:db_res.DBdata, success:db_res.success, db_message:db_res.DB_Message});
        console.log("backend responding: success...");
    }else{
        res.json({db:db_res.DBdata, success:db_res.success, db_message:db_res.DB_Message});
        console.log("backend responding: fail...");
    }
});

app.listen(PORT, ()=>{
    console.log("backend listening on port:", PORT);
});

function _tracker(req, res, next){
    console.log(`request from ip: ${req.ip}://${req.hostname}:${PORT}${req.originalUrl}`);
    next();
}