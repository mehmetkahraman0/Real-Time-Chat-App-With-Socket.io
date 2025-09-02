import asyncHandler from "../middleware/asyncHandler.js";
import Room from "../models/Room.js";
import * as crypto from "node:crypto";
import Chanel from "../models/Chanel.js";

const createRoom = asyncHandler(
    async (req,res) => {
        const {name,type,chanelId} = req.body;
        if(!name || !type){
            return res.status(404).json({message:"Bilgileri eksiksiz giriniz"});
        }
        try{
            const createdRoom = new Room({
                name,
                type,
                chanelId,
            })
            await createdRoom.save();
            const chanel = await  Chanel.findOne({_id:chanelId});
            chanel.rooms.push(createdRoom._id);
            await chanel.save()
            return res.status(202).json(createdRoom)
        }catch (e){
            console.error(e);
            return res.status(400).json({message:"Oda oluşturulamadı : ",e});
        }
    }
)

const getRoom = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:"oda bulunumadı"});
        }
        try{
            const room = await Room.findOne({_id:id})
            return res.status(200).json(room)
        }catch (e) {
            return res.status(400).json({message:"oda bilgileri alınamadı:", e})
        }
    }
)

const getAllRoom = asyncHandler(
    async (req,res) => {
        try{
            const rooms = await Room.find({})
            return res.status(200).json(rooms)
        }catch (e) {
            return res.stat(400).json({message: "odalar alınamadı:", e})
        }
    }
)

const deleteRoom = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:"oda bulumadı"})
        }
        try{
            const deletedRoom = await Room.findByIdAndDelete(id)
            return res.status(200).json(deletedRoom)
        }catch (e) {
            return res.status(400).json({message:"oda silinemedi :", e})
        }
    }
)

const updateRoom = asyncHandler(
    async (req,res) => {
        const {id} = req.params;
        console.log(id)
        const {isPrivate, name} = req.body;
        try{
            const room = await Room.findById(id)
            if(room){
                room.name = name || room.name
                room.isPrivate = isPrivate || room.isPrivate
                const updatedRoom = await room.save()
                return res.status(202).json(updatedRoom)
            }

        }catch (e) {
            return res.status(400).json({message:"update işlemi gerçekleşmedi :", e})
        }
    }
)

export {createRoom, getRoom, deleteRoom, getAllRoom, updateRoom}