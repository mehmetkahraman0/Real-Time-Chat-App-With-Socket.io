import mongoose from "mongoose";

const Message = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    roomId:{type:mongoose.Schema.Types.ObjectId,required:true, ref:"Room"},
    message:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
})

export default mongoose.model("Message",Message)