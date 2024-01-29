const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const xpath = require('xpath');
const { DOMParser } = require('xmldom');
const cors = require('cors');
const router = express.Router()
const fs = require('fs')
const { resolve } = require('path')
const { SitemapStream, streamToPromise } = require ('sitemap')
const { parser } = require('stream-json/Parser')
const { streamArray } = require('stream-json/streamers/StreamArray')
const map = require('through2-map')
const { createGzip } = require('zlib');
const { url } = require('inspector');


const app = express();

app.use(bodyParser.json());
app.use(cors());

router.get("/scrape", (req, res, next) => {
    res.json("All good in here");
  });

router.post('/scrape', (req, res) => {
    const { body } = req;
    const { url } = body;
    
    return parseUrl(url)
        .then((result) => res.json(result));
});

const xpaths = {
    title: 'string(//meta[@property="og:title"]/@content)',
    description: 'string(//meta[@property="og:description"]/@content)',
    image: 'string(//meta[@property="og:image"]/@content)',
    keywords: 'string(//meta[@property="keywords"]/@content)',
};

const retrievePage = url => axios.request({ url });
const convertBodyToDocument = body => new DOMParser().parseFromString(body);
const nodesFromDocument = (document, xpathselector) => xpath.select(xpathselector, document);
const mapProperties = (paths, document) =>
    Object.keys(paths).reduce((acc, key) =>
        ({ ...acc, [key]: nodesFromDocument(document, paths[key])}), {});


 const parseUrl = async (url) => {
    try {
        const response = await retrievePage(url) 
            const document = convertBodyToDocument(response.data);
            const mappedProperties = mapProperties(xpaths, document);
            return mappedProperties;
        } catch(error) {
            console.log(error)

        }
    }

    // Sitemap
   
    const { sitemapUrlScraper } = require("xml-sitemap-url-scraper");
    
    const fetchSitemap = () => {
    
    let sitemapUrls = [
        "https://www.miscreants.com/sitemap.xml"
    ]
    
    // Define how many compressed sitemaps we want to decompress and process at once (if any are found)
    let concurrency = 5;
    
    // Function's concurrency defaults to 1 if no param is provided
    let urls = sitemapUrlScraper(sitemapUrls, concurrency);
    
    urls.then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })  
    }

     /* router.get('/get-sitemap', async (req, res) => {
        try {
            let sitemapUrls = [
                "https://www.miscreants.com/sitemap.xml"
            ]
            
            // Define how many compressed sitemaps we want to decompress and process at once (if any are found)
            let concurrency = 5;
            
            // Function's concurrency defaults to 1 if no param is provided
            let urls = sitemapUrlScraper(sitemapUrls, concurrency);
            
            urls.then(result => {
                console.log(result)
                res.status(200).json(result)
                
            })
            
            
            console.log('sitemap fetched successfully')
        } catch (error) {
            res.json(error.status)
            console.log(error.status)
        }
    }) */

    router.post('/get-sitemap/:params', async (req, res) => {
        console.log('params object: ', JSON.stringify(req.params.params))
        let sitemapUrls = [(req.params.params)]
        try {
            console.log('😈  😈  😈   SITEMAP URL: ', sitemapUrls)
            // Define how many compressed sitemaps we want to decompress and process at once (if any are found)
            let concurrency = 5;
            
            // Function's concurrency defaults to 1 if no param is provided
            let urls = sitemapUrlScraper(sitemapUrls, concurrency);
          
            urls.then(result => {
                console.log(result)
                res.status(200).json(result)
                console.log('sitemap fetched successfully')
                
            })
            
            
           
        } catch (error) {
            res.json(error.status)
            console.log(error.status)
        }
    }) 



   






{/* const parseUrl = url =>
    retrievePage(url)
        .then((response) => {
            const document = convertBodyToDocument(response.data);
            const mappedProperties = mapProperties(xpaths, document);
            return mappedProperties;
        }); */}

module.exports = router
