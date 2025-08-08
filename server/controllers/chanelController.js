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
            return res.status(400).json({message:"kanallar alınamadı"})
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
            return res.status(400).json({message:"kanal bilgileri alınamadı."})
        }
    }
)

const getChanelByUser = asyncHandler(
    async (req,res) => {
        try{

        }catch (e) {
            
        }
    }
)

const updateChanel = asyncHandler(
    async (req,res) => {

    }
)

const deleteChanel = asyncHandler(
    async (req,res) => {

    }
)

export {createChanel,getChanel,getAllChanel,getChanelByUser,updateChanel,deleteChanel}