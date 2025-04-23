const todoItem = require("../models/todoItem");

exports.createItem = async (req, res, next) => {
  const { task, date } = req.body;
  const TodoItem = new todoItem({ task, date });
  await TodoItem.save();
  res.status(201).json({ TodoItem });
};

exports.getItems = async (req, res, next) => {
  const items = await todoItem.find();

  res.status(200).json({ items });
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  await todoItem.findByIdAndDelete(id);
  res.status(200).json({ _id: id });
};

exports.updateItem = async (req,res,next ) => {
  const { id } = req.params;
  const { task, date } = req.body;
  const updatedItem = await todoItem.findByIdAndUpdate(id, { task, date });
  res.status(200).json({ updatedItem });
};

exports.checkItem = async (req, res, next) => {
  const { id } = req.params;
  const item = await todoItem.findById(id);
  const updatedItem = await todoItem.findByIdAndUpdate(id, {
    completed: !item.completed,
  },
{
    new: true,
});
  res.status(200).json({ updatedItem });  
}