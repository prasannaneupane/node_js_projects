import { Server } from "socket.io";

export const socketHandler = (httpServer) => {
  const io = new Server(httpServer,{
    cors: {
      origin: '*',
    },
  });
  io.on("connection", (socket) => {
    console.log("socket connected");
    let room;
    socket.on("joinRoom", (roomObject) => {
      const rooms = Array.from(socket.rooms);
      rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });

      socket.join(roomObject.roomId);
      room = roomObject.roomId;
    });

    socket.on("sendMessage", (data) => {
      io.to(room).emit("sendMessageServer", data.message);
    });
  });
};