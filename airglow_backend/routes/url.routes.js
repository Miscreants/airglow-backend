const express = require("express");
const router = express.Router();
const Url = require('../models/Url.Model.js');


router.post("/addUrl", async (req, res) => {
  const body = req.body;

  try {
    Url.create({
      url: body.url,
      project: body.project,
      // user: body.user,
    });
    console.log("Url: ", body.url, "Project: ", body.project);
    res.send({ Status: "OK" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

router.get('/urls/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const urls = await Url.find({ project: projectId }).exec();
    res.json(urls);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/url/:id', async (req, res) => {
  try {
    const selectedUrl = await Url.findById(req.params.id)
    res.status(200).json(selectedUrl)
  } catch (error) {
    console.log('Error: ', error)
  }
})

router.put('/url/:id', async (req, res) => {
  const { id } = req.params;
  const { opengraphData } = req.body;

  try {
    const updatedUrl = await Url.findByIdAndUpdate(
      id,
      { opengraphData },
      { new: true } // Return the new Url object after update
    );
    if (!updatedUrl) {
      return res.status(404).json({ error: 'Url not found' });
    }
    return res.json(updatedUrl);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});




