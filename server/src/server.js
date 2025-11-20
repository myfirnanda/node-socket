const express = require('express');
const http = require('http');

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        // credentials: true
    }
});

let onlineUsers = {};

io.on('connection', socket => {
    console.log('client connected');

    socket.on("login", userId => {
        onlineUsers[userId] = socket.id;
        console.log("User registered:", userId, socket.id);
    })

    /*
    socket.on("send_message", data => {
        console.log("Message received:", data);

        if (data.recipientId === 'all') {
            // Kirim ke semua user kecuali pengirim
            socket.broadcast.emit("receive_message", data);
        } else {
            // Kirim hanya ke user spesifik
            const recipientSocketId = onlineUsers[data.recipientId];

            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receive_message", data);
                console.log(`Message sent to user ${data.recipientId} (${recipientSocketId})`);
            } else {
                console.log(`User ${data.recipientId} is offline`);
            }
        }
    });
    */

    socket.on("send_message", data => {
        if (data.recipientId === 'all') {
            console.log("→ Broadcasting to ALL users");
            socket.broadcast.emit("receive_message", data);
        } else {
            const recipientSocketId = onlineUsers[data.recipientId];
            console.log("→ Looking for recipient socket:", recipientSocketId);

            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receive_message", data);
            } else {
                console.log(`User ${data.recipientId} is OFFLINE`);
            }
        }
    });

    socket.on("disconnect", () => {
        for (let uid in onlineUsers) {
            if (onlineUsers[uid] === socket.id) {
                delete onlineUsers[uid];
                break;
            }
        }
        console.log("User disconnect: ", socket.id);
    });
});

server.listen(8000, () => {
    console.log("Successful connect on port 8000");
});