const Task = require("../models/TaskSchema");

// import async for wrappe constrollers
const asyncWarpper = require("../middlewares/async");

// get all tasks route
const getAllTasks = asyncWarpper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ amount: tasks.length, tasks });
});

// post a tasks route
const createTasks = asyncWarpper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// get a tasks by id
const getTasks = asyncWarpper(async (req, res) => {
  let id = req.params.id;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    res.status(401).json({ msg: `No task found${task}` });
  }
  res.status(200).json({ task });
});

// uodate a tasks by id
const updateTasks = asyncWarpper(async (req, res) => {
  let id = req.params.id;
  const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    res.status(500).json({ msg: `No task found${task}` });
  }
  res.status(200).json({ task });
});

// delete a tasks by id
const deleteTasks = asyncWarpper(async (req, res) => {
  let id = req.params.id;
  const task = await Task.deleteOne({ _id: id });
  res.status(200).json({ task, success: "delete the item" });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
