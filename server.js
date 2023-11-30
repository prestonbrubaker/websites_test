const express = require('express');
const app = express();

// Define the port to run the server on
const PORT = 80;

// A simple route that responds to any request
app.use((req, res) => {
    res.send('Welcome to the server accessible via IP address 73.166.159.150!');
});

// Start the server and listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
