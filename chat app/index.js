const express = require("express");
const app = express();
const { Server } = require("socket.io");

const http = require("http");
const httpServer = http.createServer(app);

const io = new Server(httpServer);
const users = {};

io.on("connection", (socket) => {
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });


socket.on("disconnect", (message) => {
    socket.broadcast.emit("leave", users[socket.id])
    delete users[socket.id];
   });
  });

httpServer.listen(8000,()=>{
  console.log("server is running at port 8000")
});