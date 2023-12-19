const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

const User = require('../model/user.model')

const login = async (req, res) => {
    const userSchema = Joi.object({
        username: Joi.string().min(6).max(30).required().messages({
            "string.base": "Username must be string",
            "string.empty": "Username must not empty",
            "string.min": "Username must be at least 6 characters long",
            "string.max": "Username must be less than or equal to 15 characters long",
            "any.required": "Username is required"
        }),
        password: Joi.string().min(6).max(30).required().messages({
            "string.base": "Password must be string",
            "string.empty": "Password must not empty",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password must be less than or equal to 15 characters long",
            "any.required": "Password is required"
        })
    })

    const { username, password } = req.body

    try {
        const validate = userSchema.validate(req.body)

        // TH user nhap sai dinh dang
        if (validate.error) {
            return res.status(400).json({ message: validate.error.message })
        }

        // TH user nhap dung dinh dang user duoc tim thay trong database
        const checkExistUser = await User.findOne({
            username: username
        }).lean()

        if (!checkExistUser) {
            return res.status(404).json({ message: "User does not exist. Not Found!" })
        }


        const checkPassword = bcrypt.compareSync(password, checkExistUser.password)


        // TH password sai
        if (!checkPassword) {
            return res.status(401).json({ message: "Password is not correct. Unauthorized!" })
        }

        // Tao token gui ve client
        const token = jwt.sign({ userId: checkExistUser._id, }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        // destructuring password
        const { password: userPassword, ...returnUser } = checkExistUser
        console.log( checkExistUser );

        return res.status(200).json({
            message: "Login Success",
            user: returnUser,
            token: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error" })
    }

}


const createUser = async (req, res) => {

    const userSchema = Joi.object({
        username: Joi.string().min(6).max(30).required().messages({
            "string.base": "Username must be string",
            "string.empty": "Username must not empty",
            "string.min": "Username must be at least 6 characters long",
            "string.max": "Username must be less than or equal to 30 characters long",
            "any.required": "Username is required"
        }),
        password: Joi.string().min(6).max(30).required().messages({
            "string.base": "Password must be string",
            "string.empty": "Password must not empty",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password must be less than or equal to 15 characters long",
            "any.required": "Password is required"
        })
    })

    const { username, password } = req.body

    try {
        const validate = userSchema.validate(req.body)

        if (validate.error) {
            return res.status(400).json({ message: validate.error.message })
        }

        // Tim ton tai duy nhat 1 username trong database
        const checkExitsUser = await User.findOne({
            username: username
        })

        if (checkExitsUser) {
            return res.status(400).json({ message: "User is exits" })
        }

        // ma hoa password
        const salt = bcrypt.genSaltSync()
        const hashPassword = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hashPassword
        })

        const saveUser = await newUser.save()

        const { password: savePassword, ...returnUser } = saveUser.toObject()

        return res.status(200).json({
            message: "Create User Success",
            newUser: returnUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error" })
    }

}

const deleteUser = (req, res) => {
    const deleteUser = req.params.id
    console.log(deleteUser);

    const data = fs.readFileSync('./data/user.json');
    const result = JSON.parse(data)

    const newResult = result.filter((item) => item.userId != deleteUser)
    const writeToFile = fs.writeFileSync('./data/user.json', JSON.stringify(newResult))

    return res.status(200).json({ message: "Delete User Success" })

}

const updateUser = (req, res) => {
}

module.exports = {
    createUser,
    deleteUser,
    login
}

// post put patch truyen qua body
// delete truyen qua params /:id  /22222
// get truyen qua query /?userId=2