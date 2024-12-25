// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.on('connect', () => {
            console.log(`Connected to server with ID: ${socket.id}`);
        });

        socket.on('receive_notification', (data) => {
            console.log('Notification received:', data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Clean up the connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);
};

export default useSocket;
