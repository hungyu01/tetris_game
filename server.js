const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tetris', { useNewUrlParser: true, useUnifiedTopology: true });

const ScoreSchema = new mongoose.Schema({
  playerName: String,
  score: Number,
  level: Number,
  difficulty: Number,
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', ScoreSchema);

app.post('/api/scores', async (req, res) => {
  const { playerName, score, level, difficulty } = req.body;
  const newScore = new Score({ playerName, score, level, difficulty });
  await newScore.save();
  res.json(newScore);
});

app.get('/api/leaderboard', async (req, res) => {
  const scores = await Score.find().sort('-score').limit(10);
  res.json(scores);
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const User = mongoose.model('User', UserSchema);
  
  app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: '註冊成功' });
  });
  
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'secret_key');
      res.json({ token });
    } else {
      res.status(400).json({ message: '用戶名或密碼錯誤' });
    }
  });
  
  // 中間件來驗證 token
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  
  // 使用中間件保護路由
  app.post('/api/scores', authenticateToken, async (req, res) => {
    // ...
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));