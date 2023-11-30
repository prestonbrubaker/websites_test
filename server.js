const express = require('express');
const app = express();

// Define the port to run the server on
const PORT = 80;

// Function to check the hostname (for both www and non-www versions)
const checkHostname = (hostname, req) => {
    return [hostname, `www.${hostname}`].includes(req.hostname);
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
    res.send('This is a generic response for other domains or requests.');
});

// Start the server and listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
