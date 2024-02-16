import React, { useState, useRef, useEffect, Children } from "react";
import gsap from "gsap";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const elementRef = useRef(null);

  const pop = useRef(null)
useEffect(()=>{
  gsap.from(pop.current,{
    scale:0,
    duration:.5,
  })
})


  useEffect(() => {
    if (elementRef.current) {
      gsap.from(elementRef.current, {
        y: -60,
        opacity:0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [task]);

  const addTask = () => {
    if (newTask.trim() === "") {
      setError("Please enter a task");
      return;
    } else if (newTask.length < 5) {
      setError("Please add more than 4 characters");
      return;
    } else {
      setError("");
    }

    setTask([...task, newTask]);
    setNewTask("");
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

          <div ref={elementRef} className="task-container my-[1vw] pt-6 px-[2vw] w-full flex flex-col gap-2 overflow-y-scroll h-[350px] ">
            {task.map((task, i) => {
              return (
                <h1 
                  key={i}
                  className="hover:scale-[1.06] cursor-pointer duration-[.5s] ease-linear  text-[1.5vw] border rounded-[20px] py-1 px-6"
                >
                  {task}
                </h1>
              );
            })}
           
          </div>
          <p ref={pop} className="text-center fixed top-[4vw] text-red-600 mt-3 text-3xl">
              {error}
            </p>
        </div>
      </div>
    </>
  );
};

export default Todo;
