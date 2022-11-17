const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//Create JSON web token using user id and a secret string to encrypt and add expiration
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

//Register user
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body

    //Validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill in all required fields")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("Email is already registered")
    }

    //Create User
    const user = await User.create({
        name,
        email,
        password,
    })

    //Generate Token
    const token = generateToken(user._id)

    //Send HTTP-only cookie to front end
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none", //Only used in deployment allows it to work on deployment
        secure: true, //Only used in deployment
    })

    if(user) {
        const { _id, name, email, photo, phone, bio }  = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//Login user
const loginUser = asyncHandler( async (req, res) => {
    const {email, password } = req.body;

    //Validate request
    if(!email || !password) {
        res.status(400)
        throw new Error("Please add email and password")
    }

    //Check if user exists
    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error("User not found, please sign up")
    }
    
    //Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    //Generate Token
    const token = generateToken(user._id)

    //Send HTTP-only cookie to front end
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none", //Only used in deployment allows it to work on deployment
        secure: true, //Only used in deployment
    })

    //Get user info if validated
    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio }  = user
        res.status(200).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(400)
        throw new Error("Invalid Email or Password")
    }
})

//Logout User
const logout = asyncHandler( async (req, res) => {
    res.cookie("token", "", { //MOdify cookie to expire it
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none", //Only used in deployment allows it to work on deployment
        secure: true, //Only used in deployment
    })
    return res.status(200).json({ message: "Logged out Successfully"})
})

//Create getUser data

const getUser = asyncHandler(async (req, res) => {
    res.send("get user data")
})

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser
}