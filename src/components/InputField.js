import React, { useEffect, useRef, useState } from "react";
import classes from "./TasksAddArea.module.css";
import { createTask } from "../model/task";
import { DateTime } from "luxon";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { GrPlan } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsRepeat } from "react-icons/bs";
import { useTasks } from "../provider/TasksProvider";
import { hover } from "@testing-library/user-event/dist/hover";

const InputField = ({ ref, currentTab }) => {
  const localizer = momentLocalizer(moment);
  const [calenderHere, setCalenderHere] = useState(false);

  //For date pickers
  const currentDateTime = DateTime.local();
  const currentDate = currentDateTime.toLocaleString(DateTime.DATETIME_SHORT);
  const nextDate = currentDateTime
    .plus({ days: 1 })
    .toLocaleString(DateTime.DATETIME_SHORT);
  const nextWeekDate = currentDateTime
    .plus({ days: 7 })
    .toLocaleString(DateTime.DATETIME_SHORT);

    //For reminders
    const currentReminder = DateTime.local().set({ hour: 21, minute: 0, second: 0, millisecond: 0 }).toFormat('yyyy-MM-dd HH:mm:ss');
    const nextReminder = DateTime.local().plus({days: 1}).set({ hour: 21, minute: 0, second: 0, millisecond: 0 }).toFormat('yyyy-MM-dd HH:mm:ss');
    const nextWeekReminder = DateTime.local().plus({days: 7}).set({ hour: 21, minute: 0, second: 0, millisecond: 0 }).toFormat('yyyy-MM-dd HH:mm:ss');

  const [currentWeekday, setCurrentWeekday] = useState(null);
  const [nextCurrentWeekday, setNext] = useState(null);

  const [selectedWeekday, setSelectedWeekday] = useState("");
  const [selectedRepeat, setSelectedRepeat] = useState("");
  const [selectedReminder, setSelectedReminder] = useState("");
  // Input tab icon handlers
  const [dateSelector, setDateSelector] = useState(false);
  const [repeatSelector, setRepeatSelector] = useState(false);
  const [reminderSelector, setReminderSelector] = useState(false);

  const [tasksAdd, setTasksAdd] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleDatePicker = (name) => {
    if(name === "Today"){
      setSelectedWeekday(currentDate);
    }else if(name === "Tomorrow"){
      setSelectedWeekday(nextDate);
    }else if(name === "Next Week"){
      setSelectedWeekday(nextWeekDate);
    }else if(name === "Pick a Date"){
      setCalenderHere(true);
    }
    setDateSelector(false);
  }

  const toggleReminderPicker = (name) => {
    if(name === "Today"){
      setSelectedReminder(currentReminder);
    }else if(name === "Tomorrow"){
      setSelectedReminder(nextReminder);
    }else if(name === "Next Week"){
      setSelectedReminder(nextWeekReminder);
    }else if(name === "Pick a Date"){
      setCalenderHere(true);
    }
    setReminderSelector(false);
  }

  const addTask = async() => {
    try {
      if(!inputValue){
        console.error("Please enter a name for the list.");
      return; // Early exit if input is invalid
      }

      const response = await fetch(`http://localhost:5001/lists/${currentTab}/tasks`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputValue,
          date: currentDate,
          reminder: selectedReminder,
          due_date: nextWeekDate,
          repeat: selectedRepeat,
          important: false,
          completed: false,
          listId: currentTab
        })

      })

      if(response.ok){
        const newTask = await response.json();
        console.log(newTask);
        setInputValue("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const uiInputIconsHandlers = () => {
    setSelectedReminder(null);
    setSelectedRepeat(null);
    setSelectedWeekday(null);
  };

  const inputHandler = () => {
    uiInputIconsHandlers();
    addTask();
    setInputValue("");
    //ref.current.blur();
  };

  const handleClickEvent = () => {
    setTasksAdd(true);
  };

  const dateOptions = [
    {
      label: "Today",
      date: currentDate
    },
    {
      label: "Tomorrow",
      date: nextDate,
    },
    {
      label: "Next Week",
      date: nextWeekDate,
    },
    {
      label: "Pick a Date",
      date: ""
    },
    {
      label: "Remove the date",
      date: ""
    }
  ];

  const reminderOptions = [
    {
      label: "Today",
      date: currentReminder
    },
    {
      label: "Tomorrow",
      date: nextReminder
    },
    {
      label: "Next Week",
      date: nextWeekReminder
    },
    {
      label: "Pick a date and time",
      date: ""
    },
    {
      label: "Delete reminder",
      date: ""
    }

  ];

  const renderIcons = (label) => {
    switch (label) {
      case "Today":
      case "Tomorrow":
      case "Next Week":
      case "Pick a Date":
      case "Remove the date":
        return <GrPlan />;
      default:
        return <GrPlan/>;
    }
  };

 

  const hoverItemDueDate = (label, date) => {
    return(
      <div className={classes.date_adders}>
        {renderIcons(label)}
        <p style={{flex: '1'}}>{label}</p>
        <p>{date}</p>
      </div>
    );
  }

  return (
    <div
      className={classes.input_quick_external}
      onClick={(e) => {
        e.stopPropagation();
        handleClickEvent();
      }}
    >
      <div
        style={{
          height: "fit-content",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >





        {/* Area for input field  */}
        <div className={classes.input_field_symbol}>
          {tasksAdd && (
            <MdOutlineRadioButtonUnchecked
              style={{ paddingLeft: "16px", paddingRight: "16px" }}
            />
          )}
          {!tasksAdd && (
            <GrAdd style={{ paddingLeft: "16px", paddingRight: "16px" }} />
          )}
          <input
            ref={ref}
            className={classes.inputF}
            placeholder="Add a task"
            value={inputValue}
            onChange={(e) => {
              e.stopPropagation();
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inputHandler();
              }
            }}
          />
        </div>
        {!tasksAdd && <span style={{ width: "100%", height: "8px" }} />}
        
        
        
        
        {/* In case you want to add a task */}
        {tasksAdd && (
          <div
            className={classes.input_field_second}
            style={{ paddingBottom: "32px" }}
          >
            <div style={{ flex: "1", display: "flex", gap: "8px" }}>




              {/* Date picker  */}
              <div
                className={classes.input_icons}
                onClick={() => {
                  setDateSelector(true);
                  setReminderSelector(false);
                  setRepeatSelector(false);
                }}
              >
                {selectedWeekday === "" && <GrPlan />}
                {selectedWeekday && (
                  <div  style={{ display: "flex", flexDirection: "row",  backgroundColor: "#FDFDFD", padding: "2px",}}>
                    <GrPlan />
                    <p style={{ cursor: "default" }}>{selectedWeekday}</p>
                  </div>
                )}
              </div>
              {dateSelector && !calenderHere && (
                <div className={classes.hoveringMenu}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <p>Due</p>
                  </div>
                  {/*Here printing hoverDateItems*/}
                  {
                    dateOptions.map((item, index)=>{
                      if(dateSelector && item.label === "Remove the date"){
                        return(<div key={index} style={{display: "flex", flexDirection: "column", cursor: 'pointer', color: "#A80000"}} onClick={()=>setSelectedWeekday("")}>
                        <hr style={{ border: "0.5px solid #9f9f9f7f" }} />
                        {hoverItemDueDate(item.label, item.date)}
                        </div>);
                      }
                      return <div key={index} style={{display: "flex", flexDirection: "column", cursor: 'pointer'}} onClick={()=>toggleDatePicker(item.label)}>
                        <hr style={{ border: "0.5px solid #9f9f9f7f" }} />
                        {hoverItemDueDate(item.label, item.date)}
                        </div>
                    })
                  }
                </div>
              )}
              {!dateSelector && calenderHere && (
                <div className={classes.hoveringMenu}>
                  <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    style={{ height: "300px", width: "fit-content" }}
                    date={dateSelector}
                    //min={new Date(currentDateTime.startOf('day').toJSDate())}
                    onNavigate={(date, view)=>{setSelectedWeekday(date.toLocaleString(DateTime.DATETIME_SHORT)); setCalenderHere(false);}}
                  />
                </div>
              )}

              {/* Reminder picker  */}
              <div
                className={classes.input_icons}
                onClick={() => {
                  setReminderSelector(!reminderSelector);
                  setDateSelector(false);
                  setRepeatSelector(false);
                }}
              >
                {!selectedReminder && <IoMdNotificationsOutline />}
                {selectedReminder && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#FDFDFD",
                      padding: "2px",
                    }}
                  >
                    <IoMdNotificationsOutline />
                    <p style={{ cursor: "default" }}>{selectedReminder}</p>
                  </div>
                )}
              </div>
              {reminderSelector && (
                <div className={classes.hoveringMenu}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <p>Remind</p>
                  </div>
                  <hr style={{ border: "0.5px solid #605E5C" }} />
                  {
                    reminderOptions.map((item, index)=>{
                      if(reminderSelector && item.label === "Delete reminder"){
                        return(<div key={index} style={{display: "flex", flexDirection: "column", cursor: 'pointer', color: "#A80000"}} onClick={()=>setSelectedReminder("")}>
                        <hr style={{ border: "0.5px solid #9f9f9f7f" }} />
                        {hoverItemDueDate(item.label, item.date)}
                        </div>);
                      }
                      return <div key={index} style={{display: "flex", flexDirection: "column", cursor: 'pointer'}} onClick={()=>toggleReminderPicker(item.label)}>
                        <hr style={{ border: "0.5px solid #9f9f9f7f" }} />
                        {hoverItemDueDate(item.label, item.date)}
                        </div>
                    })
                  }
                </div>
              )}

              {/* Repeat Picker  */}
              <div
                className={classes.input_icons}
                onClick={() => {
                  setRepeatSelector(!repeatSelector);
                  setDateSelector(false);
                  setReminderSelector(false);
                }}
              >
                {!selectedRepeat && <BsRepeat />}
                {selectedRepeat && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "#FDFDFD",
                      padding: "2px",
                    }}
                  >
                    <BsRepeat />
                    <p style={{ cursor: "default" }}>{selectedRepeat}</p>
                  </div>
                )}
              </div>
              {repeatSelector && (
                <div className={classes.hoveringMenu}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "8px",
                    }}
                  >
                    <p>Repeat</p>
                  </div>
                  <hr style={{ border: "0.5px solid #605E5C" }} />
                  <div className={classes.date_adders}>
                    <GrPlan />
                    <p
                      style={{ flex: "1" }}
                      onClick={() => {
                        setSelectedRepeat("Daily");
                        setRepeatSelector(false);
                      }}
                    >
                      Daily
                    </p>
                  </div>
                  <div className={classes.date_adders}>
                    <GrPlan />
                    <p
                      style={{ flex: "1" }}
                      onClick={() => {
                        setSelectedRepeat("Weekdays");
                        setRepeatSelector(false);
                      }}
                    >
                      Weekdays
                    </p>
                  </div>
                  <div className={classes.date_adders}>
                    <GrPlan />
                    <p
                      style={{ flex: "1" }}
                      onClick={() => {
                        setSelectedRepeat("Weekly");
                        setRepeatSelector(false);
                      }}
                    >
                      Weekly
                    </p>
                  </div>
                  <div className={classes.date_adders}>
                    <GrPlan />
                    <p
                      style={{ flex: "1" }}
                      onClick={() => {
                        setSelectedRepeat("Monthly");
                        setRepeatSelector(false);
                      }}
                    >
                      Monthly
                    </p>
                  </div>
                  <div className={classes.date_adders}>
                    <GrPlan />
                    <p
                      style={{ flex: "1" }}
                      onClick={() => {
                        setSelectedRepeat("Yearly");
                        setRepeatSelector(false);
                      }}
                    >
                      Yearly
                    </p>
                  </div>
                  <hr style={{ border: "0.5px solid #605E5C" }} />
                  <div className={classes.date_adders}>
                    <GrPlan />
                    <p
                      style={{ flex: "1" }}
                      onClick={() => {
                        setSelectedRepeat("Customized");
                        setRepeatSelector(false);
                      }}
                    >
                      Customized
                    </p>
                  </div>
                  <hr style={{ border: "0.5px solid #605E5C" }} />
                  {true && (
                    <div
                      style={{ color: "#A80000" }}
                      className={classes.date_adders}
                    >
                      <GrPlan />
                      <p style={{ flex: "1" }}>Never Repeat</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className={classes.btn} onClick={inputHandler}>
              Add
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
