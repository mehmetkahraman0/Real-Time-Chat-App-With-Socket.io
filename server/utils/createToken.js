import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, "aaabbb", {
        expiresIn: "1d",
    })
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token
}

export default generateToken