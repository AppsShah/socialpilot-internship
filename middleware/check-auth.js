const jwt = require("jsonwebtoken")

const HttpError = require("../models/http-errors")

module.exports = (req, res, next) => {

    if (req.method === "OPTIONS") return next()

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) throw new Error("Authentication Failed!")

        const decodedData = jwt.verify(token, process.env.JWT_KEY)
        req.userData = { userId: decodedData.user }
        next()
    } catch (error) {
        console.log(error)
        return next(new HttpError("Authentication Failed!", 401))
    }
}