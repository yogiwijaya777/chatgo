"use client";

import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ authUser, children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io(`http://localhost:5000`, {
      query: {
        userId: authUser?.user.id,
      },
    });

    setSocket(socket);

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => socket.close();
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
  );
};
