// const app = require('./src/app');
// require("dotenv").config();
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`A Thursday server running on port ${PORT}`);
// });
const app = require('./src/app');
require("dotenv").config();

const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

// 🔥 Create HTTP server manually
const server = http.createServer(app);

// 🔥 Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
});

// 🔥 Make io available in entire app
app.set('io', io);

// 🔥 Socket connection
io.on('connection', (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on('joinAdmin', () => {
    socket.join('adminRoom');
    console.log("👑 Admin joined room");
  });

  socket.on('disconnect', () => {
    console.log("❌ Socket disconnected");
  });
});

// 🔥 Start server
server.listen(PORT, () => {
  console.log(`🚀 A Thursday server running on port ${PORT}`);
});
