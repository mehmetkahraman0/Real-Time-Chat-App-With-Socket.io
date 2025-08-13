import mongoose, {Schema} from "mongoose";

const User  = new mongoose.Schema({
    username:{type:String,required:true, unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    joinedChanel:[{type:Schema.Types.ObjectId,required:true}],
    userFoto:{type:String,default:null},
},{timestamps:true});

export default mongoose.model("User",User);