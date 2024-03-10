import React, { useEffect, useRef, useState } from "react";
import classes from "./TasksAddArea.module.css";
import Details from "./Details";

import { GoHome } from "react-icons/go";
import { BiSortAlt2 } from "react-icons/bi";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsBrightnessHigh } from "react-icons/bs";
import { PiStar } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { IoIosList } from "react-icons/io";
import { PiDotsThreeThin } from "react-icons/pi";

import ListItem from "./ListItem";
import InputField from "./InputField";
import { useTasks } from "../provider/TasksProvider";
// import DatePicker from "react-date-picker";
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';

const TasksAddArea = ({
  sidebar,
  toggleSidebar,
  currentTab,
  tasksList,
  setTasksList,
}) => {
  const {deleteTask, toggleStarredTask, toggleCompletedTask, currentDate} = useTasks();
  const [selected, setSelected] = useState(null);
  const [currentList, setCurrentList] = useState();

  const inputRef = useRef();
  //currentTab will give us listId to be presented

  const updateTask = async() => {
    try{
      const response = await fetch(`http://localhost:5001/lists/${currentTab}/tasks/${selected}`,{
        method: 'PUT'
      })
    }catch(err){console.log(err);}
  }

  useEffect(()=>{
    const fetchList = async () => {
      try {
        const response = await fetch(`http://localhost:5001/lists/${currentTab}/tasks`, {
          method: 'GET'
        });
        const data = await response.json();
        setCurrentList(data);
        console.log(data);
        console.log('data printed');
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };
  
    fetchList();
    const intervalId = setInterval(fetchList, 8000); // Poll every 5 seconds

  // Cleanup the interval when the component unmounts
  return () => clearInterval(intervalId);
  },[currentTab])
  
  const handleLeaveEvent = () => {
    //inputRef.current.blur();
  };

  const toggleSelected = (item) => {
    setSelected(item);
  };

  const eventHandlers = (item) => {
    handleLeaveEvent();
    toggleSelected(item);
  };

  const renderIcon = () => {
    switch (currentTab?.name) {
      case "My Day":
        return <BsBrightnessHigh />;

      case "Important":
        return <PiStar />;

      case "Planned":
        return <AiOutlineSchedule />;

      case "Assigned to me":
        return <GoPerson />;

      case "Tasks":
        return <GoHome />;

      default:
        return <IoIosList />;
    }
  };

  return (
    <>
      <div className={classes.add}>
        {/* Toolbar available */}
        <div className={classes.toolbar}>
          <div className={classes.toolbar_left}>
            <div
              style={{ scale:"1.2", transform: "translateY(3px)", cursor: "pointer" }}
              onClick={() => toggleSidebar()}
            >
              {sidebar && renderIcon()}
              {!sidebar && <RxHamburgerMenu color="black" />}
            </div>
            <p
            className={classes.fonts}
              style={{
                paddingLeft: "2px",
                marginRight: "16px",
                fontWeight: "600",
              }}
            >
              {currentTab?.name}
            </p>
            <div
              style={{
                scale: "0.7",
                height: "100%",
                alignItems: "center",
                transform: "translateY(2px)",
              }}
            >
              <PiDotsThreeThin style={{ scale: "2.0", color: "black" }} />
            </div>
          </div>
          <div className={classes.toolbar_right}>
            <div style={{ display: "flex", gap: "4px" }}>
              <BiSortAlt2 />
              <p style={{ padding: "0px" }}>Sort</p>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              <HiOutlineRectangleGroup />
              <p style={{ padding: "0px" }}>Group</p>
            </div>
          </div>
        </div>

        {/* Spacing given externally */}
        <span style={{ width: "100%", height: "16px" }} />

        {/*Input Field for entering new tasks */}
        <InputField inputRef={inputRef} currentTab={currentTab}/>

        {/* Spacing given externally */}
        <span style={{ width: "100%", height: "16px" }} />

        {/* list for displaying current tasks */}
        <div
          className={classes.list}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            overflow: "scroll",
          }}
          onClick={(e) => e.stopPropagation}
        >
          {
            currentList?.map(
              (item, index) =>
                  <ListItem
                    completed={item.completed}
                    taskName={item.name}
                    taskListName={""}
                    starred={item.important}
                    setCompleted={() => {}}
                    setStarred={() => {}}
                    uiUpdates={() => {}}
                  />
            )
          }
          <p>Completed</p>
        </div>
      </div>
      {selected && (
        <Details
          selected={selected}
          toggleSelected={toggleSelected}
          close={() => setSelected(!selected)}
          deleteTask={() => deleteTask(selected)}
        />
      )}
    </>
  );
};

export default TasksAddArea;


// const uiInputIconsHandlers = () => {
  //   setSelectedReminder(null);
  //   setSelectedRepeat(null);
  //   setSelectedWeekday(null);
  // };

    // const toggleCompleted = (index) => {
  //   setTasksList((prevTasks) => {
  //     return prevTasks.map((task) => {
  //       if (task.id === index) {
  //         return { ...task, completed: !task.completed };
  //       }
  //       return task;
  //     });
  //   });
  // };

  // const toggleStarred = (index) => {
  //   setTasksList((prevTasks) => {
  //     return prevTasks.map((task) => {
  //       if (task.id === index) {
  //         return { ...task, important: !task.important };
  //       }
  //       return task;
  //     });
  //   });
  // };

  // const addTask = (newTask) => {
  //   // Update the tasks array by adding the new task
  //   setTasksList((prevTasks) => [...prevTasks, newTask]);

  //   // Clear the input value for the next task
  //   setInputValue("");
  // };

  // const inputHandler = () => {
  //   uiInputIconsHandlers();
  //   addTask({
  //     id: "3",
  //     name: inputValue,
  //     date: "",
  //     mark_as_important: false,
  //     reminder: "",
  //     add_to_my_day: false,
  //     add_due_date: "",
  //     repeat: false,
  //     categories: "",
  //     important: false,
  //   });
  // };
