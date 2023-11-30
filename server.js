const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname)); // Serve static files from the current directory

let chatLog = []; // In-memory storage for chat messages
let rectangles = []; // In-memory storage for rectangles

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        chatLog.push(data); // Add message to chat log
        io.emit('chat message', data); // Broadcast message to all connected clients
    });

    socket.on('new rectangle', (data) => {
        rectangles.push(data); // Add new rectangle data
        io.emit('update rectangles', rectangles); // Broadcast updated rectangles to all connected clients
    });
});

const PORT = process.env.PORT || 58541; // Use the port from the environment variable or default to 58541
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
