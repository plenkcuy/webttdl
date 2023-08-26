// Required packages
const express = require("express");
// npm install node-fetch@2
const fetch = require("node-fetch");
const request = require('request');

require('dotenv').config()

// Create express server
const app = express();

// Indicate the port number server will run on
const PORT = process.env.PORT || 3000;

// Set template engine
app.set("view engine", "ejs");
app.use(express.static('public'));

// Needed to parse html data for POST requests
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.render("index");
});

// POST route
app.post("/mp4", async (req, res) => {

  const videoLink = req.body.link
  
  if (
    videoLink === "" || 
    videoLink === null || 
    videoLink === undefined
  ){
    return res.render("index", { success : false, message : "Wrong Link, Paste Link Tiktok !!"});
  } else {
fetch(`https://api.tiklydown.eu.org/api/download?url=${videoLink}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
    .then (response => response.json())
    .then (data => {
res.status(200).render("index", {
  success : true,  video_title : data.url, video_link : data.video.noWatermark
})
      
    res.status(403).render("index", {
      success : false, message : data.message
    })
      
    })
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
