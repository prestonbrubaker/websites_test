const express = require('express');
const app = express();

// Define the port to run the server on
const PORT = 80;

// Define the response for "prestonbrubaker.com"
app.use((req, res, next) => {
    if (req.hostname === 'prestonbrubaker.com' || req.hostname === 'http://prestonbrubaker.com') {
        res.send('Welcome to Preston Brubaker\'s website!');
    } else {
        next();
    }
});

// Define the response for "willohrobbins.com"
app.use((req, res, next) => {
    if (req.hostname === 'willohrobbins.com' || req.hostname === 'http://willohrobbins.com') {
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
