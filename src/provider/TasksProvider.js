import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasksList, setTasksList] = useState([
    {
      id: 1,
      name: "Complete React Tutorial",
      date: "2024-02-15",
      reminder: "2024-02-14T15:00:00",
      add_due_date: "",
      repeat: "",
      category: "Tasks",
      important: true,
      completed: false,
    },
    {
      id: 2,
      name: "Prepare Project Proposal",
      date: "2024-02-20",
      reminder: "",
      add_due_date: "",
      repeat: "",
      category: "Hello",
      important: true,
      completed: false,
    },
  ]);

  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString("en-US"));
  }, []);

  const addTask = (newTask) => {
    setTasksList([...tasksList, newTask]);
  };

  const deleteTask = (item) => {
    setTasksList((prevTasks) =>
      prevTasks.filter((task) => task.id !== item.id)
    );
  };

  const toggleStarredTask = (item) => {
    setTasksList((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, important: !task.important };
        }
        return task;
      });
    });
  };

  const toggleCompletedTask = (item) => {
    setTasksList((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  };

  return (
    <TasksContext.Provider
      value={{
        currentDate,
        tasksList,
        addTask,
        deleteTask,
        toggleStarredTask,
        toggleCompletedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};
