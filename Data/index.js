const mongoose = require('mongoose');
const data = require("./data");
const schema = require("../models/Schema"); 
async function main(){
mongoose.connect('mongodb://127.0.0.1:27017/PortDB');

}
main()
.then(()=>{
    console.log("MongoDB Connected");
    insertData();  
})
.catch(err => console.log(err));

const insertData = async () =>{
    try{
        await schema.deleteMany({});
        const result = await schema.insertMany(data);
        console.log(result);
        mongoose.connection.close();
    }catch(err){
        console.log(err);
    }
}
insertData();
