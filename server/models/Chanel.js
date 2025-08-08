import mongoose from "mongoose";

const Chanel = new mongoose.Schema({
    name:{type:String,required:true},
    users:[{type:mongoose.Schema.Types.ObjectId ,ref:"User"}],
    rooms:[{type:mongoose.Schema.Types.ObjectId, ref:"Room"}],
    isPrivate:{type:Boolean,default:false},
    inviteCode:{type:String,default:null},
    admin:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
})

export default mongoose.model("Chanel",Chanel);