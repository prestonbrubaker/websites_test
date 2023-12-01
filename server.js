const express = require('express');
const app = express();
const path = require('path');

// Define the port to run the server on
const PORT = 80;

// Middleware to serve files from the correct folder based on the hostname
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

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
