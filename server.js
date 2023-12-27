const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json({ limit: '50mb' }));


// Logging Middleware
app.use((req, res, next) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    hostname: req.hostname
  };

  console.log('Logging entry:', logEntry);

  fs.appendFile('visit_logs.jsonl', JSON.stringify(logEntry) + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      console.log('Log entry successfully written');
    }
  });

  next();
});

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
  } else if (req.hostname === 'markoviandevelopments.com' || req.hostname === 'www.markoviandevelopments.com') {
    return 'public_markovian_developments';
  }
  return null;
};

// Serve files from the correct directory
app.use((req, res, next) => {
    const staticDir = chooseStaticDir(req);
    if (staticDir) {
        return express.static(path.join(__dirname, staticDir))(req, res, next);
    } else {
        next(); // Continue to the next middleware if neither domain matches
    }
});


// Endpoint to save canvas data
app.post('/save-canvas', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'canvasData.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing canvas data:', err);
            res.status(500).send('Error saving canvas data');
        } else {
            res.send('Canvas data saved successfully');
        }
    });
});

// Endpoint to retrieve canvas data
app.get('/get-canvas', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'canvasData.json'), (err, data) => {
        if (err) {
            console.error('Error reading canvas data:', err);
            res.status(500).send('Error retrieving canvas data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save game_1 data
app.post('/save-game_1', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'game_1.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing game_1 data:', err);
            res.status(500).send('Error saving game_1 data');
        } else {
            res.send('Canvas data saved successfully');
        }
    });
});

// Endpoint to retrieve game_1 data
app.get('/get-game_1', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'game_1.json'), (err, data) => {
        if (err) {
            console.error('Error reading game_1 data:', err);
            res.status(500).send('Error retrieving game_1 data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save game_2 data
app.post('/save-game_2', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'game_2.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing game_2 data:', err);
            res.status(500).send('Error saving game_2 data');
        } else {
            res.send('Canvas data saved successfully');
        }
    });
});

// Endpoint to retrieve game_2 data
app.get('/get-game_2', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'game_2.json'), (err, data) => {
        if (err) {
            console.error('Error reading game_2 data:', err);
            res.status(500).send('Error retrieving game2 data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save game_3 data
app.post('/save-game_3', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'game_3.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing game_3 data:', err);
            res.status(500).send('Error saving game_3 data');
        } else {
            res.send('Canvas data saved successfully');
        }
    });
});

// Endpoint to retrieve game_3 data
app.get('/get-game_3', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'game_3.json'), (err, data) => {
        if (err) {
            console.error('Error reading game_3 data:', err);
            res.status(500).send('Error retrieving game 3 data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save game_4 data
app.post('/save-game_4', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'game_4.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing game_4 data:', err);
            res.status(500).send('Error saving game_4 data');
        } else {
            res.send('Canvas data saved successfully');
        }
    });
});


// Endpoint to retrieve game_4 data
app.get('/get-game_4', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'game_4.json'), (err, data) => {
        if (err) {
            console.error('Error reading game_4 data:', err);
            res.status(500).send('Error retrieving game 4 data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save game_5 data
app.post('/save-game_5', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'game_5.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing game_5 data:', err);
            res.status(500).send('Error saving game_5 data');
        } else {
            res.send('Canvas data saved successfully');
        }
    });
});

// Endpoint to retrieve game_5 data
app.get('/get-game_5', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'game_5.json'), (err, data) => {
        if (err) {
            console.error('Error reading game_5 data:', err);
            res.status(500).send('Error retrieving game 5 data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save bug_craft data
app.post('/save-bug_craft', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'bug_craft.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing bug_craft data:', err);
            res.status(500).send('Error saving bug_craft data');
        } else {
            res.send('bug_craft data saved successfully');
        }
    });
});

// Endpoint to retrieve bug_craft data
app.get('/get-bug_craft', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'bug_craft.json'), (err, data) => {
        if (err) {
            console.error('Error reading bug_craft data:', err);
            res.status(500).send('Error retrieving bug_craft data');
        } else {
            res.send(data);
        }
    });
});

// Endpoint to save bug_craft_users data
app.post('/save-bug_craft_users', (req, res) => {
    const canvasData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'bug_craft_users.json'), JSON.stringify(canvasData), (err) => {
        if (err) {
            console.error('Error writing bug_craft_users data:', err);
            res.status(500).send('Error saving bug_craft_users data');
        } else {
            res.send('bug_craft_users data saved successfully');
        }
    });
});

// Endpoint to retrieve bug_craft_users data
app.get('/get-bug_craft_users', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'bug_craft_users.json'), (err, data) => {
        if (err) {
            console.error('Error reading bug_craft_users data:', err);
            res.status(500).send('Error retrieving bug_craft_users data');
        } else {
            res.send(data);
        }
    });
});

// Fallback for any other requests
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const PORT = 443;
// Create an HTTPS server and attach the Express app
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
