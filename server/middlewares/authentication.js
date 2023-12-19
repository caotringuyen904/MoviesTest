const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model'); // Adjust the path as needed


// if user can access the route
const authentication = async (req, res, next) => {
    const bearerToken = req.headers.authorization // token co dang Bearer token
    if (!bearerToken) {
        return res.status(401).json({ message: "Unauthorized! You are not logged in yet" })
    }
    // type: 'Bearer token' using split to take the token 
    const token = bearerToken.split(" ")[1]
    try {
        const verifyToken = jwt.verify(token, process.env?.SECRET_KEY);

        // TH token sai dinh dang hoac het han
        if (!verifyToken) {
            return res.status(401).json({ message: "Unauthorized! You are not logged in yet" })
        }

        // TH lay token success gan userId
        const userId = verifyToken?.userId

        // check user co ton tai
        const checkUser = await userModel.findById(userId)

        // const checkUser = await userModel.findOne({
        //     _id: userId
        // })

        if(!checkUser){
            return res.status(404).json({ message: "User not exist"})
        }

        req.user = checkUser

        console.log("123323438768678678678678324");
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized! You are not logged in yet" });
    }
};

module.exports = authentication