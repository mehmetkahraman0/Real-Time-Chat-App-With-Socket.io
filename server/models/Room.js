import mongoose, {Schema} from "mongoose";

const Room  = new mongoose.Schema({
    name:{type:String, required:true},
    chanelId:{type:Schema.Types.ObjectId, default:null},
    type:{type:String, enum:["text","voice"]},
})

export default mongoose.model("Room",Room)