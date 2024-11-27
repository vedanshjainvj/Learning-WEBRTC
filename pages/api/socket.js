import { Server } from "socket.io";

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket already initialized");
    } else {
        console.log("Initializing Socket.io server...");
        const io = new Server(res.socket.server, {
            path: "/api/socket",
            cors: {
                origin: "*", // Allow all origins (adjust as per your needs)
                methods: ["GET", "POST"],
            },
        });

        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("Client connected:", socket.id);

            // Listen for the 'join-room' event
            socket.on("join-room", (roomId, userId) => {
                console.log(`A new user ${userId} joined room ${roomId}`);
                socket.join(roomId);

                // Notify other users in the room
                socket.broadcast.to(roomId).emit("user-connected", userId);
            });
            socket.on("user-toggle-audio", (userId, roomId) => {
                socket.join(roomId);
                console.log(`User ${userId} toggled audio in room ${roomId}`);
                socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
            });
            socket.on("user-toggle-video", (userId, roomId) => {
                socket.join(roomId);
                console.log(`User ${userId} toggled video in room ${roomId}`);
                socket.broadcast.to(roomId).emit("user-toggle-video", userId);
            });
            socket.on("user-leave", (userId, roomId) => {
                socket.join(roomId);
                console.log(`User ${userId} ended room ${roomId}`);
                socket.broadcast.to(roomId).emit("user-leave", userId);
            });
        });
    }
    res.end();
};

export default SocketHandler;
