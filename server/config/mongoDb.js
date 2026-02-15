import mongoose from "mongoose";

const connectedDb = async () => {
    try{
        await mongoose.connect("mongodb://62.84.187.91:27017/")
        console.log("Connected to mongoDB");
    }catch (error) {
        console.error(error);
    }
}

export default connectedDb

