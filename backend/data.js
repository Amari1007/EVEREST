const mongoose = require("mongoose");
const cors = require("cors");
const localSrv = "mongodb://localhost:27017/HIMA";

async function runMain(){
  return {superUser:"Chaupi Ghambi",_password:"1007"}
}

async function runMongo(user_data = {}){
  const schema = {
    id:Number,
    header:String,
    body:String,
    source:String,
    date:Number
  };
  
  try {
    if(user_data.body != undefined || user_data.header != undefined){
      await mongoose.connect(localSrv)
      console.log("connected");
  
      const tableSchema = new mongoose.Schema(schema);
      tableSchema.methods.displayBody = function displayBody(){console.log(this.body)};
      
      const _model = mongoose.model("dbhima", tableSchema);
      const _insert = new _model({
        id: await new Date().getTime(),
        header: await user_data.header,
        body: await user_data.body,
        source: await user_data.source,
        date: await user_data.date,
      });      
      await _insert.save();
      return {insert_record:true, DB_Message:"Saved Document"};

    }else{
      throw "No data provided";
    }
  } catch (error) {
    console.log("An error occured:",error);
    return {insert_record:false, DB_Message:"No data provided"};
  }

};

module.exports = {runMain,runMongo}