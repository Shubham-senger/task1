
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'frontend/build')));
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


const addDemoTasks = async () => {
  try {
    const demoTasks = [
      { text: "order 1", status: "todo" },
      { text: "order 2", status: "doing" },
      { text: "order 3", status: "done" },
      { text: "order 4", status: "trash"}
    ];
    for (const taskData of demoTasks) {
      const task = new Task(taskData);
      await task.save();
    }
    console.log("Demo tasks added successfully.");
  } catch (err) {
    console.error("Error adding demo tasks:", err.message);
  }
};

app.get('/api/tasks', async (req, res) => {
  try { 
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { text, status } = req.body; 
  try {
    const task = new Task({
      text: text,
      status: status,
    });

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  //await addDemoTasks();
});
