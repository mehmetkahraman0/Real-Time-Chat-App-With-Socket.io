import asyncHandler from "../middleware/asyncHandler.js";
import crypto from "node:crypto";
import Chanel from "../models/Chanel.js";

const createChanel = asyncHandler(
    async (req, res) => {
        const { name, isPrivate } = req.body;
        if (!name || !isPrivate) {
            return res.status(404).json({ message: "Bilgileri eksiksiz giriniz" });
        }
        try {
            const createdChanel = new Chanel({
                name,
                isPrivate,
                users: req.user._id,
                admin: req.user._id,
                chanelFoto: req.file ? req.file.originalname : null,
            })
            console.log("createChanel", createdChanel)
            await createdChanel.save();
            return res.status(202).json(createdChanel)
        } catch (e) {
            return res.status(400).json({ message: "Oda oluşturulamadı : ", e });
        }
    }
)

const getAllChanel = asyncHandler(
    async (req, res) => {
        try {
            const chanels = await Chanel.find({})
            return res.status(200).json(chanels)
        } catch (e) {
            return res.status(400).json({ message: "kanallar alınamadı", e })
        }
    }
)

const getChanel = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "kanal bulunamadı." })
        }
        try {
            const chanel = await Chanel.find({ _id: id })
            return res.status(200).json(chanel)
        } catch (e) {
            return res.status(400).json({ message: "kanal bilgileri alınamadı.", e })
        }
    }
)

const getChanelByUser = asyncHandler(
    async (req, res) => {
        console.log("user ıd ", req.user)
        try {
            const userJoinedChanel = await Chanel.find({
                users: req.user._id,
            })
            return res.status(200).json(userJoinedChanel)
        } catch (e) {
            return res.status(400).json({ message: "kanalların bilgileri alınamadı.", e })
        }
    }
)

const updateChanel = asyncHandler(
    async (req, res) => {
        const { isPrivate, name } = req.body;
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "kanal bulunmadı." })
        }
        try {
            const updatedChanel = await Chanel.findById(id)
            updatedChanel.name = name || updatedChanel.name
            updatedChanel.isPrivate = isPrivate || updatedChanel.isPrivate
            updatedChanel.chanelFoto = req.file.path || updatedChanel.chanelFoto
            const savedUpdateChanel = await updatedChanel.save()
            return res.status(200).json(savedUpdateChanel)
        } catch (e) {
            return res.status(400).json({ message: "Kanal bilgileri güncellenemedi : ", e })
        }
    }
)

const addUserInChanel = asyncHandler(
    async (req, res) => {
        const { userId } = req.user;

        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "kanal bulunmadı." })
        }
        try {
            const updatedChanel = await Chanel.findById(id)
            updatedChanel.users.push(userId)
            const savedUpdateChanel = await updatedChanel.save()
            return res.status(200).json(savedUpdateChanel)
        } catch (e) {
            return res.status(400).json({ message: "Kanal bilgileri güncellenemedi : ", e })
        }
    }
)

const userJoinWithInvetiCode = asyncHandler(
    async (req, res) => {
        const { inviteCode } = req.body
        console.log(req.body)
        if (!inviteCode) {
            return res.status(400).json({ message: "Davet kodunu giriniz." })
        }
        try {
            const invitedChanel = await Chanel.findOne({ "inviteCode.code": inviteCode })
            const codeObj = invitedChanel.inviteCode.find(c => c.code === inviteCode);
            if (codeObj.endTime && codeObj.endTime > new Date()) {
                if (invitedChanel.users.includes(req.user._id))
                    return res.status(400).json({ message: "Kullanıcı zaten bu kanala kayıtlı" })
                invitedChanel.users.push(req.user._id)
                await invitedChanel.save()
                return res.status(202).json({codeObj, invitedChanel})
            } else {
                return res.status(400).json({ message: "Kanala bulunumadı." })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: "Kanala kayıt edilemedi.", error: e })
        }
    }
)

const deleteChanel = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: "kanal bulunamadı. " })
        try {
            const deletedChanel = await Chanel.findByIdAndDelete(id)
            return res.status(200).json(deletedChanel)
        } catch (e) {
            return res.status(400).json({ message: "kanal silme sırasında bir sorun oluştu.", e })
        }
    }
)

const deleteUserInChanel = asyncHandler(
    async (req, res) => {
        const { userId } = req.body;
        console.log(req.body)
        const { id } = req.params
        console.log("user id", userId)
        try {
            const chanel = await Chanel.findOne({ _id: id })
            if (!chanel)
                return res.status(404).json({ message: "Kanal bilgileri alıjırken bir sorun oluştu." })
            const newUserList = chanel.users.filter(item => { return item.toString() !== userId })
            chanel.users = newUserList
            const savedChanel = await chanel.save()
            return res.status(202).json(savedChanel)
        } catch (error) {
            return res.status(400).json({ message: "Kullanıcı silme sırasında bir sorun oluştu." })
        }
    }
)

const deleteRoomInChanel = asyncHandler(
    async (req, res) => {
        const { roomId } = req.body;
        console.log(req.body)
        const { id } = req.params
        console.log("user id", roomId)
        try {
            const chanel = await Chanel.findOne({ _id: id })
            if (!chanel)
                return res.status(404).json({ message: "Kanal bilgileri alıjırken bir sorun oluştu." })
            const newRoomList = chanel.rooms.filter(item => { return item.toString() !== roomId })
            console.log(newRoomList)
            chanel.rooms = newRoomList
            const savedChanel = await chanel.save()
            return res.status(202).json(savedChanel)
        } catch (error) {
            return res.status(400).json({ message: "Kullanıcı silme sırasında bir sorun oluştu." })
        }
    }
)

function addHours(hoursToAdd) {
    const now = new Date(); // şu anki tarih-saat
    now.setHours(now.getHours() + hoursToAdd); // saat ekle
    return now;
}

const createInviteCodeInChanel = asyncHandler(
    async (req, res) => {
        let endTime;
        const { endTimeKey, chanelId, selectedRoom } = req.body;
        const chanel = await Chanel.findById(chanelId);
        const inviteCode = crypto.randomBytes(4).toString("hex") + crypto.randomBytes(4).toString("hex");
        if (!chanel)
            return res.status(404).json({ message: "Davet kodu oluşturulurken bir sorun oluştu." })
        try {
            switch (endTimeKey) {
                case "1h":
                    endTime = addHours(1)
                    break;
                case "2h":
                    endTime = addHours(2)
                    break;
                case "4h":
                    endTime = addHours(2)
                    break;
                case "1d":
                    endTime = addHours(24)
                    break;
                default:
                    break;
            }
            chanel.inviteCode.push({ code: inviteCode, endTime, selectedRoom })
            const savedChanel = await chanel.save()
            return res.status(202).json({inviteCode,selectedRoom})
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
)

export { createChanel, getChanel, getAllChanel, getChanelByUser, updateChanel, addUserInChanel, deleteChanel, userJoinWithInvetiCode, deleteUserInChanel, deleteRoomInChanel, createInviteCodeInChanel }