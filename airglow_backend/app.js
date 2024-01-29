// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");



const app = express();

// fixing "413 Request Entity Too Large" errors

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

const cors = require("cors")

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "airglow_backend";

app.locals.appTitle = `${capitalize(projectName)}`;



// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const imageRoutes = require('./routes/image.routes')
app.use(imageRoutes)

const userRoutes = require('./routes/user.routes')
app.use(userRoutes)

const scraper = require('./routes/scraper')
app.use(scraper)

const projectRoutes = require('./routes/project.routes')
app.use(projectRoutes)

const urlRoutes = require('./routes/url.routes')
app.use(urlRoutes)



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

const bodyParser = require('body-parser')
const xpath = require ('xpath')
const { DOMParser } = require('xmldom')
const axios = require('axios')



module.exports = app;
