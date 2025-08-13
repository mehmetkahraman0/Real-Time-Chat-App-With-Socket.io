import asyncHandler from "../middleware/asyncHandler.js";
import Message from "../models/Message.js";

const getMessage = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        if(!id) return res.status(404).send('Oda Bulunumadı.')
        try{
            const messages = await Message.find({roomId: id}).populate("senderId", "username").sort({createdAt: 1})
            res.status(200).json(messages)
        }catch (e) {
            return res.status(500).send("mesajlar getirilirken bir sorun oldu: ",e)
        }
    }
)

export {getMessage}