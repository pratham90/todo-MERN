import "./App.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Navbar from "./components/navbar";
import { useTodos } from "./components/functions/appMethods";
import { ToastContainer } from "react-toastify";
import { getItemsFromServer } from "./components/itemsServices";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    todo,
    todos,
    date,
    setTodos,
    formatDate,
    handleAdd,
    handleEdit,
    handleCheck,
    handleDelete,
    handleDate,
    handleChange,
  } = useTodos();

  useEffect(() => {
    getItemsFromServer().then((items) => {
      setTodos(items);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-start p-10 bg-gradient-to-br from-blue-300 to-green-500 min-h-screen text-black">
        <div className="bg-white shadow-2xl rounded-lg p-6 w-[800px]">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Todo List
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <motion.input
              whileFocus={{ scale: 1.05 }}
              onChange={handleChange}
              value={todo || ""}
              className="border border-black rounded-lg p-2 w-full text-base bg-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              type="text"
              name="text"
              id="text"
              placeholder="Add a new task"
            />
            <motion.input
              whileFocus={{ scale: 1.05 }}
              onChange={handleDate}
              className="border border-black rounded-lg p-2"
              value={date ? date.slice(0, 10) : ""}
              type="date"
              name="date"
              id="date"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add
            </motion.button>
          </div>
          <ul className="todos list-disc list-inside space-y-3">
            <AnimatePresence>
              {todos.map((item) => {
                return (
                  <motion.li
                    key={item.id || ""}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`text-lg flex justify-between items-center bg-blue-100 p-3 rounded-lg shadow-md`}
                  >
                    <div
                      className={`max-w-100 ${
                        item.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.serverItem}
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="mr-10 text-sm text-gray-700">
                        Deadline - {formatDate(item.date) || "Not set"}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="text-black hover:text-gray-500"
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="text-black hover:text-gray-500"
                      >
                        <MdDelete />
                      </motion.button>
                      <motion.input
                        whileHover={{ scale: 1.1 }}
                        type="checkbox"
                        name={item.id}
                        onChange={(e) => {
                          handleCheck(e, item.id);
                        }}
                        checked={item.isCompleted || ""}
                      />
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
