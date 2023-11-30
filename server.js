const express = require('express');
const app = express();

// Define the port to run the server on
const PORT = 80;

// Function to check the hostname
const checkHostname = (hostname, req) => {
    return req.hostname === hostname || req.hostname === `www.${hostname}`;
};

// Define the response for "prestonbrubaker.com"
app.use((req, res, next) => {
    if (checkHostname('prestonbrubaker.com', req)) {
        res.send('Welcome to Preston Brubaker\'s website!');
    } else {
        next();
    }
});

// Define the response for "willohrobbins.com"
app.use((req, res, next) => {
    if (checkHostname('willohrobbins.com', req)) {
        res.send('Welcome to Willoh Robbins\' website!');
    } else {
        next();
    }
});

// Fallback for any other requests
app.use((req, res) => {
    res.send('Neither Preston or Willoh');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
