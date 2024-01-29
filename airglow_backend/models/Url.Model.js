const Project = require('/Users/user/Desktop/my-files/Airglow/airglow_backend/models/Project.model.js')

const { Schema, model } = require("mongoose");


const UrlSchema = new Schema(
    {
        image: {
            type: String,                  
        
    },
    opengraphData: {
        type: Object,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: Project,
    },
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}
)

const Url = model("Url", UrlSchema)

module.exports = Url