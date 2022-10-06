import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials :true
    }
});

dotenv.config();

io.on('connection', (socket) => {
    console.log(`${socket.id} socket connected!`);
    io.emit('show', `${socket.id} is participated`);
    socket.on('letChat', (msg) => {
        io.emit('show', `[${socket.id}]: ${msg}`);
        //socket.emit('show', msg);
    })
})

server.listen(process.env.PORT, () => console.log("server connected.."));
