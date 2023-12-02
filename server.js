const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// SSL/TLS certificate paths
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl_certs/privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl_certs/fullchain.pem')),
  ca: fs.readFileSync(path.join(__dirname, 'ssl_certs/chain.pem'))
};

// Function to determine the correct directory based on the hostname
const chooseStaticDir = (req) => {
  if (req.hostname === 'prestonbrubaker.com' || req.hostname === 'www.prestonbrubaker.com') {
    return 'public_preston';
  } else if (req.hostname === 'willohrobbins.com' || req.hostname === 'www.willohrobbins.com') {
    return 'public_willoh';
  }
  return null;
};

// Serve files from the correct directory
app.use((req, res, next) => {
  const staticDir = chooseStaticDir(req);
  if (staticDir) {
    express.static(path.join(__dirname, staticDir))(req, res, next);
  } else {
    next(); // Continue to the next middleware if neither domain matches
  }
});

// Logging Middleware
app.use((req, res, next) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    hostname: req.hostname
  };

  fs.readFile('visit_logs.json', (err, data) => {
    let logs = [];

    if (!err && data) {
      try {
        logs = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    }

    logs.push(logEntry);

    fs.writeFile('visit_logs.json', JSON.stringify(logs, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to log file:', writeErr);
      }
    });
  });

  next();
});

// Fallback for any other requests
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Define the port to run the server on
const PORT = 443;

// Create an HTTPS server and attach the Express app
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
