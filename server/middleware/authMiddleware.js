import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authendicate = asyncHandler(
    async (req, res, next) => {
        let token = req.cookies.token
        if(token){
            try{
                const decoded = jwt.verify(token, "aaabbb");
                req.user = await User.findById(decoded.userId).select("-password");
                next()
            }catch (e) {
                res.status(201).json({message:"token decode hatası :" + e})
            }
        }else{
            res.status(401).json({message:""});
        }
    }
)

export {authendicate}