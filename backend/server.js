require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:mongopass123@mongodb:27017/construction_management?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  initializeAdmin();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Initialize Admin User
async function initializeAdmin() {
  const User = require('./src/models/User');
  const bcrypt = require('bcryptjs');
  
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        fullName: 'مدیر سیستم',
        role: 'admin',
        permissions: {},
        expiryType: 'permanent',
        isActive: true
      });
      console.log('✅ Admin user created: admin/admin123');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    uptime: process.uptime() 
  });
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/materials', require('./src/routes/materials'));
app.use('/api/statements', require('./src/routes/statements'));
app.use('/api/crews', require('./src/routes/crews'));
app.use('/api/reports', require('./src/routes/reports'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/dashboard', require('./src/routes/dashboard'));
app.use('/api/notifications', require('./src/routes/notifications'));
app.use('/api/activity-logs', require('./src/routes/activityLogs'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket.io for real-time updates
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

global.io = io;

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('authenticate', (userId) => {
    socket.join(`user_${userId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`   http://localhost:${PORT}`);
});
