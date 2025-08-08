import mongoose, {Schema} from "mongoose";

const Room  = new mongoose.Schema({
    name:{type:String, required:true},
    chanelId:{type:Schema.Types.ObjectId, default:null},
    type:{type:String, enum:["text","voice"]},
    // kullancılar kısmını ekleyerek sınırlamaktansa rol ekleyerek sınırlama yapılabilir düşünülecek
    //users:[{user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},permission:{type:String,enum:["cannotWrite","muted"]}}],
})

export default mongoose.model("Room",Room)