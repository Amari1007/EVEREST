use("HIMA");
const data = {
    id: new Date().getTime(),
    header:`Biggest African Port to Be Partially Privatized`,
    body:``,
    source:`Bloomberg.com`,
    date:new Date("July 17, 2023 11:48:19").getTime(),
};

//db.getCollection("dbhimas").deleteMany({});
//db.getCollection("dbhimas").insertOne(data);
//db.getCollection("dbhimas").updateOne({id:1689463587231},data);
//db.getCollection("dbhimas").find({});
db.getCollection("dbhimas").find({}).sort({date:-1})