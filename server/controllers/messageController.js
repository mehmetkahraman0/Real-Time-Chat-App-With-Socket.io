import asyncHandler from "../middleware/asyncHandler.js";
import Message from "../models/Message.js";

const getMessage = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        console.log("istelin room id si : ", id)
        if(!id) return res.status(404).send('Oda Bulunumadı.')
        try{
            const messages = await Message.find({roomId: id}).sort({createdAt: 1})
            res.status(200).json(messages)
        }catch (e) {
            console.log(e)
            return res.status(500).send("mesajlar getirilirken bir sorun oldu: ",e)
        }
    }
)

export {getMessage}