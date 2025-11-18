const express = require('express');
const http = require('http');

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
        methods: ["GET", "POST"],
        // credentials: true
    }
});

io.on('connection', socket => {
    console.log('client connected');

    socket.on("send_message", data => {
        io.emit("receive_message", data);
    });
});

server.listen(8000, () => {
    console.log("Successful connect on port 8000");
});