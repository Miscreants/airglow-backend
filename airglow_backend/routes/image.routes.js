const express = require("express");
const { base } = require("../models/Image.model");
const router = express.Router();
const Image = require("../models/Image.model");

router.post('/uploadImage', (req, res) => {
    const {base64} = req.body

    try {
        Image.create({image: base64})
        
        res.send({Status: "OK"})
    } catch (error) {
        res.send({Status: "Error: ", data:error})
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
