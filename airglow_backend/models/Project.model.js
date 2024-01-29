const { Schema, model } = require("mongoose");


const ProjectSchema = new Schema(
    {
        project: {
            type: String,
            required: true,
            
        },
        sitemap: {
            type: Array,
            required: true,
        },
        user: {
            type: Object,
        }, 
    }
)

const Project = model("Project", ProjectSchema)

module.exports = Project