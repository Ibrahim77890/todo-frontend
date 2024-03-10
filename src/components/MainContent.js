import React, { useEffect, useState } from "react";
import classes from "./MainContent.module.css";
import SideBar from "./SideBar";
import TasksAddArea from "./TasksAddArea";
import { useTasks } from "../provider/TasksProvider";

const MainContent = () => {
  const [sidebar, setSideBar] = useState(true);

  const [currentListId, setCurrentListId] = useState();
  const [specialLists, setSpecialLists] = useState();

  const { tasksList, addTasks } = useTasks();

  const { currentList, setCurrentList } = useState([]);

  const [userLists, setUserLists] = useState([
    {
      name: "Micheal",
    },
    {
      name: "Hello",
    },
  ]);

  const toggleSideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  const updateSidebar = () => {
    // Update sidebar based on screen width
    const screenWidth = window.innerWidth;
    setSideBar(screenWidth >= window.screen.width / 2);
  };

  useEffect(() => {
    // Initial update on component mount
    updateSidebar();
    // Add a resize event listener to update sidebar on window resize
    window.addEventListener("resize", updateSidebar);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSidebar);
    };
  }, []);

  return (
    <div className={classes.main}>
      <SideBar
        setCurrentList={setCurrentList}
        userLists={userLists}
        setUserLists={setUserLists}
        tasksList={tasksList}
        sidebar={sidebar}
        toggleSidebar={toggleSideBar}
        currentTab={currentListId}
        toggleTab={setCurrentListId}
        specialLists={specialLists}
        setSpecialLists={setSpecialLists}
      />
      <TasksAddArea
        tasksList={tasksList}
        setTasksList={addTasks}
        sidebar={sidebar}
        toggleSidebar={toggleSideBar}
        currentTab={currentListId}
      />
    </div>
  );
};

export default MainContent;
