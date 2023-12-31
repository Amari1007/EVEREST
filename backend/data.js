//comparison is the thief pf joy :D

const mongoose = require("mongoose");
const cors = require("cors");
const localSrv = "mongodb://localhost:27017/HIMA";

async function runMain(){
  return {superUser:"Chaupi Ghambi",_password:"1007"}
}

//INSERT DATA IN MONGODB
async function runInsertMongo(user_data = {}){
  const schema = {
    id:Number,
    header:String,
    body:String,
    source:String,
    date:Number
  };
  
  try {
    if(user_data.body != undefined && user_data.header != undefined){
      await mongoose.connect(localSrv);
      console.log("db connected");
  
      const tableSchema = new mongoose.Schema(schema);
      
      //ADD METHOD TO SCHEMA (FOR TESTING)
      tableSchema.methods.displayBody = function(){console.log(this.body)};
      
      const _model = mongoose.model("dbhima", tableSchema); //APPLY SCHEMA TO MODEL
      const _insert = new _model({
        id: await new Date().getTime(), //ID IS ONLY INSERTED HERE DIRECTLY IN DB UPON DOC CREATION
        header: await user_data.header,
        body: await user_data.body,
        source: await user_data.source,
        date: await user_data.date,
      });// INVOKE CLASS TO SAVE DATA TEMPLATE

      await _insert.save(); //SAVE DOCUMENT
      return {insert_record:true, DB_Message:"Saved Document"};

    }else{
      throw "No data provided";
    }
  } catch (error) {
    console.log("An error occured:",error);
    return {insert_record:false, DB_Message:error};
  }finally{
    await mongoose.connection.close();
    console.log("closed db connection...");
  }

};

//GET DATA FROM MONGODB
async function runGetMongo(param = {}){

  try {
    await mongoose.connect(localSrv);
    console.log("connected to db!");
    const schema = {
      id:Number,
      header:String,
      body:String,
      source:String,
      date:Number,
    }

    const addSchema = new mongoose.Schema(schema);
    const dbModel = mongoose.model("dbhimas",addSchema);

    if(param.body != undefined && param.header != undefined && param !=null){
      console.log("responding...");
      return {DBdata:await dbModel.find().sort({date:-1}), success:true, DB_Message:"read opp success"};
    }else{
      throw "No param provided";
    }
    
  } catch (error) {
    console.log("An error occured:",error);
    mongoose.models = {};
    return {DBdata:null, success:false, DB_Message:error};
  }finally{
    mongoose.models = {};
    await mongoose.connection.close();
    console.log("closed db connection...");
  }

}

//DELETE ROW IN MONGO
async function runDeleteMongo(param = {}){
  const schema = {
    id:Number,
    header:String,
  }

  try {
    await mongoose.connect(localSrv);
    const addSchema = new mongoose.Schema(schema);
    const con = mongoose.model('dbhimas', addSchema);

    if(param.id != undefined && param.header != undefined && param != null){
      await con.deleteOne({id:param.id});
      console.log("db responding");
      return{DB_Message: "Successfully Deleted from db", success:true};
    }else{
      throw "No param provided";
    }

  } catch (error) {
    console.log(`An error occured while deleting row with id ${param.id} -> ${error}`);
    return{
      DB_Message:`An error occured while deleting row with id ${param.id}`,
      success:false,
     }
  }finally{
    mongoose.models = {}; //RESET ALL MODELS
    await mongoose.connection.close();
    console.log("closing db connection");
  }

}

module.exports = {runMain, runInsertMongo, runGetMongo, runDeleteMongo};