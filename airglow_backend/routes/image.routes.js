const express = require("express");
const { base } = require("../models/Image.model");
const router = express.Router();
const Image = require("../models/Image.model");

router.post('/uploadImage', async (req, res) => { // Make sure this is an async function
    const { base64 } = req.body;

    try {
        const newImage = await Image.create({ image: base64 }); // Await the Image creation
        
        res.send({ status: "OK", imageId: newImage._id }); // Send back the new image's ID
    } catch (error) {
        res.status(500).send({ status: "Error", data: error }); // It's good practice to respond with an error status code on failure
    }
});


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
