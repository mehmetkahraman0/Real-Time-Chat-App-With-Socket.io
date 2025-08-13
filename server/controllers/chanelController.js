import asyncHandler from "../middleware/asyncHandler.js";
import crypto from "node:crypto";
import Chanel from "../models/Chanel.js";

const createChanel = asyncHandler(
    async (req,res) => {
        const {name,isPrivate} = req.body;

        console.log(req.user)
        if(!name || !isPrivate){
           return res.status(404).json({message:"Bilgileri eksiksiz giriniz"});
        }
        try{
            const inviteCode = crypto.randomBytes(4).toString("hex") + crypto.randomBytes(4).toString("hex")
            const createdChanel = new Chanel({
                name,
                isPrivate,
                inviteCode,
                users:req.user._id,
                admin:req.user._id,
                chanelFoto : req.file ? req.file.path : null,
            })
            await createdChanel.save();
            return res.status(202).json(createdChanel)
        }catch (e){
            return res.status(400).json({message:"Oda oluşturulamadı : ",e});
        }
    }
)

const getAllChanel = asyncHandler(
    async (req,res) => {
        try{
            const chanels = await Chanel.find({})
            return res.status(200).json(chanels)
        }catch(e) {
            return res.status(400).json({message:"kanallar alınamadı", e})
        }
    }
)

const getChanel = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:"kanal bulunamadı."})
        }
        try{
            const chanel = await Chanel.findById(id)
            return res.status(200).json(chanel)
        }catch (e) {
            return res.status(400).json({message:"kanal bilgileri alınamadı.", e})
        }
    }
)

const getChanelByUser = asyncHandler(
    async (req,res) => {
        try{
            const userJoinedChanel = await Chanel.find({
                users:req.user._id,
            })
            return res.status(200).json(userJoinedChanel)
        }catch (e) {
            return res.status(400).json({message:"kanalların bilgileri alınamadı.", e})
        }
    }
)

const updateChanel = asyncHandler(
    async (req,res) => {
        const {isPrivate, name} = req.body;
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:"kanal bulunmadı."})
        }
        try{
            const updatedChanel = await  Chanel.findById(id)
            updatedChanel.name = name || updatedChanel.name
            updatedChanel.isPrivate = isPrivate || updatedChanel.isPrivate
            updatedChanel.chanelFoto = req.file.path || updatedChanel.chanelFoto
            const savedUpdateChanel = await updatedChanel.save()
            return res.status(200).json(savedUpdateChanel)
        }catch (e) {
            return res.status(400).json({message:"Kanal bilgileri güncellenemedi : ",e})
        }
    }
)

const deleteChanel = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        if(!id) return res.status(404).json({message:"kanal bulunamadı. "})
        try{
            const deletedChanel = await Chanel.findByIdAndDelete(id)
            return res.status(200).json(deletedChanel)
        }catch (e) {
            return res.status(400).json({message:"kanal silme sırasında bir sorun oluştu.", e})
        }
    }
)

export {createChanel,getChanel,getAllChanel,getChanelByUser,updateChanel,deleteChanel}