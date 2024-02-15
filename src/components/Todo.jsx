import React, { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState(" ");

  const addTask = () => {
    if (newTask === " ") {
      alert("enter a task");
      return;
    }
    setTask([...task, newTask]);
  };

  return (
    <>
      <div className="main  bg-gradient-to-r mx-auto py-[10vw] from-gray-700 via-gray-900 to-black w-screen h-screen text-white">
        <div className="todo	overflow-hidden w-[30vw] h-[60vh]  mx-auto rounded-[20px] p-[10px] border">
          <h1 className="text-[3vw] font-bold ms-[7vw] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text ">
            ToDo App
          </h1>

          <div className="inputContainer  justify-center flex w-full h-[3vw] items-center gap-[1vw] mt-9">
            <input
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              type="text"
              placeholder="Add Task"
              className="py-[.7vw] px-[2vw] rounded-[50px] text-black"
            />
            <button
              onClick={addTask}
              className="py-[.7vw] px-[2vw] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block      rounded-[60px]"
            >
              Add Task
            </button>
          </div>

          <div className="task-container my-[1vw] px-[2vw] w-full flex flex-col gap-2  overflow-y-scroll h-[300px] ">
            {task.map((task, i) => {
              return (
                <h1
                  key={i}
                  className="text-[1.5vw] border rounded-[20px] py-1 px-6"
                >
                  {task}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
