const express = require('express');
const router = express.Router();
const Project = require("../models/Project.model");

router.get('/get-projects', async (req, res) => {
    try {
        const allProjects = await Project.find()
        res.status(200).json(allProjects)
        console.log("Projects fetched successfully: ")
    } catch (error) {
        res.json(error.status)
        console.log(error.status)
    }
})

router.post('/addProject', async (req, res) => {
   
const body = req.body

    try {
       Project.create({ 
        project: body.project,
        sitemap: body.sitemap,
        // user: body.user,
        })
        console.log(body.sitemap, body.project)
        res.send({Status: 'OK'})
    } catch (error) {
        console.log(error)
    }
    })

    router.get('/project/:id', async (req, res) => {
        try {
            const selectedProject = await Project.findById(req.params.id)
            res.status(200).json(selectedProject)
        } catch (error) {
            console.log(error)
        }
      })





module.exports = router