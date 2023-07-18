const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const imageSchema = new Schema(
  {
    image: String,
  },
  {
    collection: "Image Uploads",
  }
);

const Image = model("Image", imageSchema);

module.exports = Image;
