import mongoose from "mongoose";

const connectedDb = async () => {
    try{
        await mongoose.connect("mongodb+srv://mehmetmehmetkahramankahraman:642534@cluster0.vgncyht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to mongoDB");
    }catch (error) {
        console.error(error);
    }
}

export default connectedDb

