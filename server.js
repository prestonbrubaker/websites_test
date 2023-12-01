const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// SSL/TLS certificate paths
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/prestonbrubaker.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/prestonbrubaker.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/prestonbrubaker.com/chain.pem')
};

// Define the port to run the server on
const PORT = 443;

// Serve files from public_preston and public_willoh based on hostname
app.use((req, res, next) => {
    if (req.hostname === 'prestonbrubaker.com' || req.hostname === 'www.prestonbrubaker.com') {
        express.static(path.join(__dirname, 'public_preston'))(req, res, next);
    } else if (req.hostname === 'willohrobbins.com' || req.hostname === 'www.willohrobbins.com') {
        express.static(path.join(__dirname, 'public_willoh'))(req, res, next);
    } else {
        next(); // Continue to the next middleware if neither domain matches
    }
});

// Fallback for any other requests
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Create an HTTPS server with the SSL/TLS options and attach the Express app
https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});
