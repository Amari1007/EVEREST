//comparison is the thief pf joy :D
require("dotenv").config();
const {runInsertMongo,runGetMongo,runDeleteMongo} = require("./data.js");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 1313 || process.env.PORT;
//const PORT = process.env.PORT || 8888;

app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use(_tracker);

//GET TABLE DATA
app.get("/backend/api/getTableData", async (req, res)=>{
    const param = {body:"body1",header:"header1"};
    const db_res = await runGetMongo(param);
    const date = new Date(); // USED TO DISPLAY IN DEBUG

    if(db_res.success){//if opp success
        res.json({db:db_res.DBdata, success:db_res.success, db_message:db_res.DB_Message});
        console.log(`backend responding: success at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);;
    }else{
        res.json({db:db_res.DBdata, success:db_res.success, db_message:db_res.DB_Message});
        console.log(`backend responding: fail at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);;
    }
});

//SAVE NEW TABLE ROW
app.post("/backend/api/saveData", async(req, res)=>{
    const user_data = req.body;
    console.log("user data", user_data);
    const response = await runInsertMongo({
        header:user_data.header,
        body:user_data.text_box,
        source:user_data.source,
        date:user_data.date,
    });

    res.json({message:response.DB_Message, success:response.insert_record});
});

//DELETE FROM TABLE
app.delete("/backend/api/deleteTableRow", async(req, res)=>{
    const data = req.body;
    const response = await runDeleteMongo(data);
    res.json({message:response.DB_Message, success:response.success});
    console.log(`Delete request made for row id: ${data.id}`);
});

app.listen(PORT, ()=>{
    console.log("backend listening on port:", PORT);
});

function _tracker(req, res, next){
    console.log(`request from ip: ${req.ip}://${req.hostname}:${PORT}${req.originalUrl}`);
    next();
}