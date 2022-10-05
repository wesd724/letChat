import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();
const __dirname = path.resolve();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on('connection', (socket) => {
    console.log(`${socket.id} socket connected!`);
    socket.emit('show', `${socket.id} is participated`);
    socket.on('letChat', (msg) => {
        io.emit('show', `[ALL]: ${msg}`);
        socket.emit('show', msg);
    })
})

server.listen(process.env.PORT, () => console.log("server connected.."));
