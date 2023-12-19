// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// import connection from "../../lib/connection";
// import { admin } from "../../controllers/Admin/admin-authorizer";
// import FireUserEntity from "../../schema/firebase/FireUserSchema";
// import {
//   createImageMessage,
//   createTextMessage,
// } from "../../controllers/Firebase/Chat/sendMessage";
// import Joi from "@hapi/joi";

// const getMessagesValidator = Joi.object({
//   uid: Joi.string().min(28).required(),
//   receiverUID: Joi.string().min(28).required(),
// });

// const sendMessageValidator = Joi.object({
//   email: Joi.string().email().required(),
//   message: Joi.string().min(1).max(500).required().allow(null),
//   receiverUID: Joi.string().min(28).required(),
//   image: Joi.string().min(55).required().allow(null),
// });

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// await connection();

// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html"); // Replace 'index.html' with your actual HTML file
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("get-messages", async (dataObj) => {
//     // Handle get-messages event

//     const { uid, receiverUID } = dataObj;

//     const { error } = await getMessagesValidator.validateAsync(dataObj);

//     if (error) {
//       socket.emit("error", { success: false, error: error });
//     } else {
//       const fireUser = await FireUserEntity.findOne({ uid: uid });

//       if (fireUser == null) {
//         socket.emit("error", {
//           success: false,
//           error: "No such fire user found, please resignup",
//         });
//       } else {
//         admin
//           .collection(fireUser.role)
//           .doc(uid)
//           .collection(receiverUID)
//           .orderBy("sentTime", "asc")
//           .onSnapshot((messagesSnapshot) => {
//             messagesSnapshot.docs.forEach((doc) => {
//               socket.emit("message", doc.data());
//             });
//           });
//       }
//     }

//     console.log("get-messages:", dataObj);
//   });

//   socket.on("send-message", (dataObj) => {
//     // Handle send-message event
//     console.log("send-message:", dataObj);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
