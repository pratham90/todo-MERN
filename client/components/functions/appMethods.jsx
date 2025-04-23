import { useState } from "react";
import { toast } from "react-toastify"; // add this at the top
import {
  addItemToServer,
  deleteItemFromServer,
  updateItemFromServer,
  checkItemFromServer,
} from "../itemsServices";

export const useTodos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return ""; // empty if no date

    const date = new Date(dateString);
    if (isNaN(date)) return ""; // handle invalid dates

    return date.toLocaleDateString("en-GB"); // e.g., 21/04/2025
  };
  const handleEdit = async (e, id) => {
    const serverItem = await updateItemFromServer(id, todo, date);
    const taskToEdit = todos.find((item) => item.id === serverItem.id);
    setTodo(taskToEdit.serverItem);
    setDate(taskToEdit.date);
    handleDelete(e, id);
    // setTodos(todos.map(item =>
    //   item.id === id
    // ));
  };
  const handleAdd = async () => {
    if (!todo.trim()) {
      toast.warn("Please enter a task first!");
      return;
    }
    const serverItem = await addItemToServer(todo, date);
    //  console.log(item)
    const newTodo = [...todos, serverItem];
    setTodos(newTodo);
    setTodo("");
    // setDates([...dates,{date}])
    setDate("");
  };
  const handleDelete = async (e, id) => {
    const serverItem = await deleteItemFromServer(id);
    let newTodos = todos.filter((items) => {
      return items.id !== serverItem;
    });
    setTodos(newTodos);

    toast.error("Task deleted ❌");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleCheck = async (e, id) => {
    // Call to backend to update the completion status
    const updated = await checkItemFromServer(id); // Toggle the completion status server-side
  

    const updatedItem = updated.updatedItem;
    // console.log("updatedItem", updatedItem);
    if (!updatedItem) {
      console.error("No updatedItem returned");
      return;
    }

    // Update the local state to reflect the change
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedItem._id
        ? { ...todo, isCompleted: updatedItem.completed }
        : todo
    );

    setTodos(updatedTodos); // Update the state

    // Show the toast notification
    if (updatedItem.completed) {
      toast.success("Task completed ✅");
    } else {
      toast.info("Task marked incomplete 🕒");
    }
  };

  return {
    todo,
    setTodo,
    todos,
    date,
    formatDate,
    handleAdd,
    handleEdit,
    handleCheck,
    handleDelete,
    handleDate,
    handleChange,
    setTodos,
  };
};
