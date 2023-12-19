// // import { admin } from "../../Admin/admin-authorizer";

// import { admin } from "../../Admin/admin-authorizer";

// // export default async function getMessages(receiverId, uid, userType) {

// //     admin.firestore()
// //         .collection(userType)
// //         .doc(uid)
// //         .collection(receiverId)
// //         .orderBy('sentTime', descending: false)
// //         .snapshots(includeMetadataChanges: true)
// //         .listen((messages) {
// //       this.messages = messages.docs
// //           .map((doc) => MessageEntity.fromJson(doc.data()))
// //           .toList();
// //       update();

// //       scrollDown();
// //     });

// //     const unsubscribe = admin
// //     .firestore()
// //     .collection(userType)
// //     .doc(uid)
// //     .collection(receiverId)
// //     .orderBy('sentTime', 'asc')
// //     .onSnapshot((querySnapshot) => {
// //       messages.length = 0;

// //       querySnapshot.forEach((doc) => {
// //         messages.push(doc.data());
// //       });

// //       // Assuming `update()` is a function to update the state or trigger a re-render
// //       update();

// //       scrollDown();
// //     });

// //     return messages;
// //   }

// //TODO converted code from prompt engineer
// // export default async function getMyUsers(uid, userType) {
// //   return new Promise((resolve, reject) => {
// //     try {
// //       const myUsersSnapshot = admin
// //         .firestore()
// //         .collection(userType)
// //         .doc(uid)
// //         .collection("myUsers");

// //       const unsubscribe = myUsersSnapshot.onSnapshot((snapshot) => {
// //         const myUsers = snapshot.docs[0].data().uids || [];
// //         const userPromises = myUsers.map(async (uid) => {
// //           const userRef = admin
// //             .firestore()
// //             .collection(userType == "cleaners" ? "users" : "cleaners")
// //             .doc(uid)
// //             .collection("profile")
// //             .doc(uid);

// //           return userRef.get().then((fetchedUser) => {
// //             return fetchedUser.data();
// //           });
// //         });

// //         Promise.all(userPromises).then((users) => {
// //           // Assuming you have a WebSocket connection to send updates
// //           // You can replace this with any logic to send updates to your API clients
// //           sendUsersToClients(users);

// //           resolve(users);
// //         });
// //       });

// //       // Assuming you might want to return an unsubscribe function
// //       // This can be useful to stop listening when the client disconnects or logs out
// //       resolve(unsubscribe);
// //     } catch (error) {
// //       // Handle the error as needed
// //       console.error("Error getting users:", error);
// //       reject(error);
// //     }
// //   });
// // }

// // Example usage:
// // In your API route or WebSocket connection handling logic
// // The client can subscribe to the stream and receive updates
// // const unsubscribe = await getMyUsers();

// // When the client disconnects or logs out, call the unsubscribe function
// // unsubscribe();

// import { Server } from "socket.io";
// import connection from "../../lib/connection";

// const io = new Server(res.socket.server, {
//     path: "/api/socket_io",
//     addTrailingSlash: false,
//   });
//   res.socket.server.io = io;

//   io.on("connection", (socket) => {
//     socket.on("join-room", (roomId) => {
//       socket.join(roomId);
//     });

//     socket.on("send-message", async (obj) => {
//       const { roomId, message, sender } = obj;
//       const chat = new ChatSchema({
//         roomId: roomId,
//         message: message,
//         sender: sender,
//       });
//       await chat.save();

//       io.to(roomId).emit("receive-message", chat);
//     });
//   });

//   console.log("Setting up socket");
//   res.end();

// const SocketIO = require("socket.io");
// const io = new SocketIO(server);

// io.on("connection", (socket) => {
//   socket.on("message", (req) => {
//     const { uid, receiverId } = req;
//     admin
//       .collection("users")
//       .doc(uid)
//       .collection(receiverId)
//       .orderBy("sentTime", "asc")
//       .onSnapshot((messagesSnapshot) => {
//         messagesSnapshot.docs.forEach((doc) => {
//           socket.emit("message", doc.data());
//         });
//       });
//   });
// });
