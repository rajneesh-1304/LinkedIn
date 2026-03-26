// // import { io, Socket } from "socket.io-client";

// // let socket: Socket | null = null;

// // export const getSocket = () => {
// //   if (!socket) {
// //     socket = io("http://localhost:3005", {
// //       autoConnect: false,
// //       withCredentials: true,
// //       transports: ["websocket", "polling"],
// //     });

// //     socket.on("connect", () => {
// //       console.log("🟢 Socket connected:", socket?.id);
// //     });

// //     socket.on("disconnect", () => {
// //       console.log("🔴 Socket disconnected");
// //     });

// //     socket.on("connect_error", (err) => {
// //       console.log("⚠️ Socket error:", err.message);
// //     });
// //   }

// //   return socket;
// // };

// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export const getSocket = () => {
//   if (!socket && typeof window !== "undefined") {
//     socket = io("http://localhost:3005", {
//       autoConnect: false,
//       withCredentials: true
//     });
//   }

//   return socket;
// };

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3005", {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log(":large_green_circle: Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log(":red_circle: Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log(":warning: Socket error:", err.message);
    });

    socket.io.on("reconnect_attempt", () => {
      console.log(":arrows_counterclockwise: Reconnecting...");
    });

    socket.io.on("reconnect", () => {
      console.log(":white_check_mark: Reconnected");
    });

    socket.io.on("reconnect_failed", () => {
      console.log(":x: Reconnect failed");
    });
  }

  return socket;
};