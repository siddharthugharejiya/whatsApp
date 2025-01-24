const { Server } = require('socket.io');

// Create a Socket.IO server
const io = new Server(9596, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from your React app
  },
});

let users = [];

// Add a user to the users array
const addUser = (userData, socketId) => {
  if (!users.some((user) => user.sub === userData.sub)) {
    users.push({ ...userData, socketId });
  }
};

// Get a user by their ID
const getUser = (userId) => users.find((user) => user.sub === userId);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Add a user when they join
  socket.on('addUser', (userData) => {
    addUser(userData, socket.id);
    io.emit('getUsers', users); // Notify all clients of updated users list
  });

  // Handle sending a message
  socket.on('sendMessage', (data) => {
    const user = getUser(data.receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', data); // Send the message to the receiver
    } else {
      console.error('User not found:', data.receiverId);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit('getUsers', users); // Notify all clients of updated users list
    console.log('User disconnected:', socket.id);
  });
});
