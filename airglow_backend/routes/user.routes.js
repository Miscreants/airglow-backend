const express = require('express');
const router = express.Router();


const User = require("../models/User.model");

router.post("/signUp", async (req, res) => {
    const body = req.body

    try {
        const user = await User.create({
            email: body.email,
            password: body.password,
            fullName: body.fullName,
            address: body.address,
            city: body.city,
            companyName: body.companyName,
            country: body.country,
            state: body.state,
            zip: body.zip,

        })
        res.status(200).send({ message: "User Created" })
        console.log('New User: ', user)
    } catch (error) {
        console.log(error)
    }
})

// GET all users 

router.get("/get-users", async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
        console.log("Users fetched successfully: ")
    } catch (error) {
        res.json(error.status)
        console.log(error.status)
    }
})

// GET user by email

router.get("/get-user/:email", async (req, res, next) => {
    const { email } = req.params
    try {
        const user = await User.findOne(email)
        console.log("User: ", user, "Email: ", email)
        console.log()
    } catch (error) {
        res.json(error.status)
        console.log(error.status)
    }
 })

router.get('/get-images', async (req, res) => {
    try {
        const allImages = await Image.find()
        res.status(200).json(allImages)
        console.log("Images fetched successfully: ")
    } catch (error) {
        res.json(error.status)
        console.log(error.status)
    }
})






module.exports = router;