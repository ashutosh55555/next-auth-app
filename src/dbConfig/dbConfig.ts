import mongoose  from "mongoose";

export async function Connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        
        connection.on('connected',()=>{
            console.log("momgodb connected sucessfully")
        })
        connection.on('error',(err)=>{
            console.log("make sure momgodb runnig or not")
        })


    }catch(err){
        console.log("somthing  goes wrong",err);
     }
    
}