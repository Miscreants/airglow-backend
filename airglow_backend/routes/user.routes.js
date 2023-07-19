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




module.exports = router;