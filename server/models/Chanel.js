import mongoose from "mongoose";

const Chanel = new mongoose.Schema({
    name:{type:String,},
    users:[{type:mongoose.Schema.Types.ObjectId ,ref:"User"}],
    rooms:[{type:mongoose.Schema.Types.ObjectId, ref:"Room"}],
    isPrivate:{type:Boolean,default:false},
    inviteCode:[{code:{type:String,default:null}, endTime:{type:Date,default:null}, selectedRoom:{type:String,default:null}}],
    admin:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    chanelFoto:{type:String,default:null},
})

export default mongoose.model("Chanel",Chanel);