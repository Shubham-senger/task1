
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Task = mongoose.model('Task', {
  text: String,
  status: String,
});


app.get('/api/tasks', async (req, res) => {
  try { 
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task({
    text: req.body.text,
    status: req.body.status,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (req.body.text != null) {
      task.text = req.body.text;
    }
    if (req.body.status != null) {
      task.status = req.body.status;
    }
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
