import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export const SocketProvider = (props) => {
    const { children } = props;
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketConnection = io({
            path: "/api/socket",
        });

        setSocket(socketConnection);

        socketConnection.on("connect", () => {
            console.log("Connected to server with id:", socketConnection.id);
        });

        socketConnection.on("connect_error", async (err) => {
            console.error("Socket connection error:", err);
            await fetch("/api/socket");
        });

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
