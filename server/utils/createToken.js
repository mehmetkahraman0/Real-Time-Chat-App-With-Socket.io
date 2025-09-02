import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const jwtToken = jwt.sign({userId}, "aaabbb", {
        expiresIn: "1d",
    })
    res.cookie("jwtToken", jwtToken, {
        httpOnly: false,
        secure: false,             // localhost için
        sameSite: "lax",          // farklı origin için gerekli
        maxAge: 24*60*60*1000
    });
    return jwtToken
}

export default generateToken