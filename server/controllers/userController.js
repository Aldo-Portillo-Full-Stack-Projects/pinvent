const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Token = require("../models/tokenModel")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")

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
    const user = await User.findById(req.user._id)

    if(user) {
        const { _id, name, email, photo, phone, bio }  = user
        res.status(201).json({
            _id, name, email, photo, phone, bio,
        })
    } else {
        res.status(400)
        throw new Error("User Not Found")
    }
})

//Get login status
const loginStatus = asyncHandler( async (req, res) => {

    const token = req.cookies.token;

    if(!token) {
        return res.json(false)
    }

    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified) {
        return res.json(true)
    }

    return res.json(false)
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        const { name, email, photo, phone, bio }  = user

        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updateUser = await user.save()
        res.status(200).json({
            _id:updateUser._id, 
            name:updateUser.name, 
            email:updateUser.email, 
            photo:updateUser.photo, 
            phone:updateUser.phone, 
            bio:updateUser.bio,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) //Gets user

    const {oldPassword, password} = req.body;

    //Validate

    if(!user){
        res.status(400);
        throw new Error("User not found, please signup")
    }
    if(!oldPassword || !password){
        res.status(400);
        throw new Error("Please add old and new password")
    }

    //Check if old password matches in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

    //Save new password if password is correct
    if( user && passwordIsCorrect) {
        user.password = password
        await user.save()
        res.status(200).send("password change successful")
    } else {
        res.status(400);
        throw new Error("Old password is incorrect")
    }

})

const forgotPassword = asyncHandler( async (req, res) => {
    const {email} = req.body; //gets email from request
    const user = await User.findOne({email}) //Find email

    if(!user) {
        res.status(404);
        throw new Error("User does not exist")
    }

    //Delete Token if it exists in DB
    let token = await Token.findOne({userID: user._id})

    if(token){
        await token.deleteOne()
    }

    //Create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id
    console.log("Reset Token: " + resetToken) //Delete in Production
    //Hash token before saving to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    console.log("Hashed Token1: " + hashedToken)
    //Save token to DB
    await Token.create({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) //Expires at 30min
    })
    await user.save() 

    //Construct URL for resetting
    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}/`

    // Construct Reset Email 

    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for 30 minutes</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards</p>
        <p>Portillo</p>
    `

    const subject = "Password Reset Request"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER

    try{
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({success: true, message: "Reset Email Sent!"})
    } catch (err) {
        res.status(500)
        throw new Error("Email not sent, please try again")
    }
})

//Reset Password

const resetPassword = asyncHandler(async(req, res) => {

    const {password} = req.body
    const {resetToken} = req.params //Params is the /:params of the route

    console.log("passsword: " + password)
    console.log("Reset Token from function: " + resetToken)
    

    //Hash token and compare it to DB token
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex") //Hash reset token in params from the link sent to user

    console.log("Hashed Token: " + hashedToken)
    //Find DB token
    const userToken = await Token.findOne({
        token: hashedToken, //Find token
        expiresAt: {$gt: Date.now()} //Check if token is greater than current time (expired)
    })

    if(!userToken){
        res.status(404)
        throw new Error("Invalid or Expired Link")
    }

    //Find User
    const user = await User.findOne({_id: userToken.userId}) //Find user by userToken
    user.password = password //Change user.password to oasswird passed in req.body
    await user.save() //Save changes to DB
    res.status(200).json({
        message: "Password Reset Successful, Please Log in"
    })
})

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}