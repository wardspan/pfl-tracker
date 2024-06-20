const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uri = "mongodb+srv://pfl_demo_user:Test123Test@cluster0.7264iy3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const app = express();
const PORT = process.env.PORT || 5050;
const SECRET_KEY = 'rabbits-are-cute';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  task_id: String,
  area: String,
  model_number: String,
  task: String,
  task_date: String,
  period: String,
});

const actionSchema = new mongoose.Schema({
  task_id: String,
  task_date: String,
  who_performed: String,
  notes: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
});

const Task = mongoose.model('Task', taskSchema);
const Action = mongoose.model('Action', actionSchema);
const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, SECRET_KEY);
    res.send({ user: { username: user.username, isAdmin: user.isAdmin }, token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/api/tasks/:username', async (req, res) => {
  const tasks = await Task.find({}); // Add filtering logic based on the period and current date
  res.send(tasks);
});

app.post('/api/tasks/:username/submit', async (req, res) => {
  const { tasks, comments } = req.body;
  tasks.forEach(async task => {
    if (task.completed) {
      const action = new Action({
        task_id: task._id,
        task_date: task.task_date,
        who_performed: req.params.username,
        notes: comments[task._id] || '',
      });
      await action.save();
    }
  });
  res.send('Tasks submitted successfully');
});

app.get('/api/admin/report', async (req, res) => {
  const report = await Action.find({});
  res.send(report);
});

app.get('/api/admin/tasks', async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
});

app.post('/api/admin/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

app.delete('/api/admin/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send('Task deleted');
});

app.get('/api/admin/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.post('/api/admin/users', async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ username, password: hashedPassword, isAdmin });
  await user.save();
  res.send(user);
});

app.delete('/api/admin/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send('User deleted');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
