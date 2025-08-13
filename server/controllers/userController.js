import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import user from "../models/User.js";
import createToken from "../utils/createToken.js";

const registerUser = asyncHandler(
    async (req, res) => {
        const {username, password, email} = req.body;

        console.log(req.file);
        if(!username || !password || !email){
           return res.status(400).json({message:"Bilgileri eksiksiz giriniz."});
        }
        try{
            const hashedPass = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                password: hashedPass,
                email,
                userFoto :req.file.path
            })
            await newUser.save();
            return res.status(200).json(newUser);
        }catch (e) {
            console.error("register user error : ", e)
            return res.status(400).json({message: "register user error :" + e});
        }
    }
)

const loginUser = asyncHandler(
    async (req, res) => {
        const {username, password} = req.body;
        if(!username || !password ){
            return res.status(400).json({message:"Bilgileri eksiksiz giriniz."});
        }
        const existingUser = await User.findOne({username});
        if(existingUser){
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if(isPasswordValid){
                createToken(res, existingUser._id)
                res.status(202).json({
                    _id:existingUser._id,
                    username:existingUser.username,
                    email:existingUser.email,
                    joinedChanel : existingUser.joinedChanel
                });
            }else{
                return res.status(400).json({message:"Şifre eşleşmiyor"});
            }
        }else{
            return res.status(404).json({message:"Kullanıcı bulunamadı"})
        }
    }
)

const logoutUser = asyncHandler(
    async (req, res) => {
        res.cookie("token","", {
            httpOnly: true,
            expires: new Date(0)
        })
    }
)

const getCurrentUser = asyncHandler(
    async (req, res) => {
        try{
            const currentUser = await User.findById(req.user._id).select("-password");
            res.status(200).json(currentUser)
        }catch (e) {
            res.status(400).json({message:"kullanıcı bulunumadı : " + e});
        }

    }
)

const getAllUser = asyncHandler(
    async (req, res) => {
        const users = await User.find({})
        res.json(users)
    }
)
//fix gerekiyor kullancının join chanel olayı halledilmeli
const updateCurrentUser = asyncHandler(
    async (req, res) => {
    console.log(req.user)
        const {username, password,newPassword,email} = req.body;
        try{
            const user = await User.findById(req.user._id)
            user.username = username || user.username;
            user.email = email || user.email;
            if(req.file) {
                user.userFoto = req.file.path || user.userFoto
            }
            if(newPassword){
                const oldPassword = await bcrypt.compare(password, user.password)
               if(oldPassword)
                   user.password = await bcrypt.hash(newPassword, 12)
            }
            const updatedUser = await user.save()
            return res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                userFoto: updatedUser.userFoto,
            })
        }catch (e) {
            return res.status(400).json({message:"Update Error : " + e});
        }
    }
)

const getUserById = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:"Kullanıcı bulunamadı. "});
        }
        try{
            const user = await User.findById(id).select("-password");
            return res.status(200).json(user)
        }catch (e) {

        }
    }
)

export { registerUser,loginUser, logoutUser,getCurrentUser,getAllUser,updateCurrentUser, getUserById}