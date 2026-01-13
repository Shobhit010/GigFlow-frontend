import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { Toast } from "../components/ui/Toast";
import { AnimatePresence } from "framer-motion";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Only connect if user is logged in
        if (userInfo) {
            const socketInstance = io("http://localhost:5000"); // Backend URL

            setSocket(socketInstance);

            socketInstance.on("connect", () => {
                console.log("Socket connected:", socketInstance.id);
                socketInstance.emit("register", userInfo._id);
            });

            socketInstance.on("notification", (data) => {
                console.log("Notification received:", data);
                setNotification(data);

                // Auto dismiss after 5 seconds
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            });

            return () => {
                socketInstance.disconnect();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
            <AnimatePresence>
                {notification && (
                    <Toast
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </AnimatePresence>
        </SocketContext.Provider>
    );
};
