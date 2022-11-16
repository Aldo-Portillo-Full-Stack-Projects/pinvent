const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')



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

    //Encrypt Password before sending to DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt) //Password is destructured otherwise it'll be req.body.password

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user) {
        const { _id, name, email, photo, phone, bio }  = user
        res.status(201).json({
            _id, name, email, photo, phone, bio
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

module.exports = {
    registerUser,
}