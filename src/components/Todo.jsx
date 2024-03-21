import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const taskContainerRef = useRef(null);
  const deleAnime = useRef(null);

  useEffect(() => {
    if (taskContainerRef.current) {
      const newTaskElement = taskContainerRef.current.firstChild;
      gsap.from(newTaskElement, {
        y: -60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        backgroundColor: "blue",
      });
    }
  }, [tasks]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (newTask.trim() === " ") {
      setError("Please enter a task");
      return;
    } else if (newTask.length < 5) {
      setError("Please add more than 5 characters");
      return;
    } else {
      setError("");
    }

    setTasks([newTask, ...tasks]);
    setNewTask("");
  };

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTask = localStorage.getItem("task");
    if (storedTask) {
      setTasks(JSON.parse(storedTask));
    }
  }, []);
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className="main bg-gradient-to-r mx-auto flex justify-center items-center from-gray-700 via-gray-900 to-black w-screen h-screen text-white">
        <div className="todo w-[30vw] h-[70vh] mx-auto rounded-[20px] p-[10px] border">
          <h1 className="text-[3vw] font-bold ms-[7vw] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text ">
            ToDo App
          </h1>

          <div className="inputContainer justify-center flex w-full h-[3vw] items-center gap-[1vw] mt-9">
            <input
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Add Task"
              className="py-[.7vw] px-[2vw] rounded-[50px] text-black"
            />
            <button
              onClick={addTask}
              className="py-[.7vw] px-[2vw] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block rounded-[60px]"
            >
              Add Task
            </button>
          </div>

          <div
            ref={taskContainerRef}
            className=" task-container my-[1vw] py-1 px-[2vw] w-full flex flex-col gap-2 overflow-y-scroll h-[350px] "
          >
            {tasks.map((task, index) => (
              <div
                className="task flex w-full justify-between gap-2"
                key={index}
              >
                <h1 className="hover:scale-y-[1.09] hover:border-none w-full hover:bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 cursor-pointer duration-[.3s] ease-linear  text-[1.5vw] border rounded-[20px] py-1 px-6">
                  {task}
                </h1>
                <button
                  onClick={() => deleteTask(index)}
                  className=" border py-1 px-6 rounded-[20px] hover:bg-slate-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <p className="text-center fixed top-[4vw] text-red-600 mt-3 text-3xl">
            {error}
          </p>
        </div>
      </div>
    </>
  );
};

export default Todo;
