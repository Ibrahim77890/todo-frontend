import React, { useEffect, useState } from "react";
import classes from "./Details.module.css";

import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { LuPanelRightClose } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import DetailTab from "./DetailTab";
import Overlay from "./Overlay";
import { GrPlan } from "react-icons/gr";

const Details = ({ selected, close, deleteTask }) => {
  const [stepsList, setStepsList] = useState([
    {
      step: "No name",
    },
  ]);

  useEffect(()=>{
    
    const fetchTask = async() => {
      try{
      const response = await fetch(`http://localhost:5001/lists/${selected?.listId}/tasks/${selected?.taskId}`,{
        method: 'GET'
      });
      const data = await response.json();
      console.log(data);
    }catch(err){
      console.log(err);
    }
    }

    fetchTask();
  },[selected])

  const [starred] = useState(false);
  const [selectedDetailsTab, setSelectedDetailsTab] = useState(false);
  const [inputStep, setInputStep] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentWeekday, setCurrentWeekday] = useState(null);
  const [nextCurrentWeekday, setNext] = useState(null);

  const [selectedWeekday, setSelectedWeekday] = useState(null);
  const [selectedRepeat, setSelectedRepeat] = useState(null);
  const [selectedReminder, setSelectedReminder] = useState(null);
  // Input tab icon handlers
  const [dateSelector, setDateSelector] = useState(false);
  const [repeatSelector, setRepeatSelector] = useState(false);
  const [reminderSelector, setReminderSelector] = useState(false);

  const toggleSelector = () => {
    setSelectedDetailsTab(!selectedDetailsTab);
  };

  const deleteToggler = () => {
    close();
    deleteTask();
  };

  useEffect(() => {
    // Update the current date every second
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const dueDate = () => {
    const date = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    selected.add_due_date = date;
  };

  const dueDateCustom = (date) => {
    selected.add_due_date = date;
  };

  const uiHandler = () => {
    setDateSelector(false);
    setReminderSelector(false);
    setRepeatSelector(false);
  }

  return (
    <div className={classes.details}>
      <div className={classes.task_styling}>
        <div
          style={{
            paddingLeft: "16px",
            color: "#2564CF",
            scale: "1.3",
            cursor: "pointer",
          }}
        >
          <MdOutlineRadioButtonUnchecked />
        </div>
        <p
          style={{
            flex: "1",
            fontSize: "16px",
            color: "rgb(41,40,39)",
            lineHeight: "20px",
            fontWeight: "600",
          }}
        >
          {selected.name}
        </p>
        <div
          style={{
            paddingRight: "16px",
            color: "#2564CF",
            scale: "1.3",
            cursor: "pointer",
          }}
        >
          {starred ? <FaStar /> : <FaRegStar />}
        </div>
      </div>

      {/* Second scrollable div here */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "0px",
          backgroundColor: "transparent",
          height: "80%",
          overflowY: "auto",
          gap: "8px",
        }}
      >
        {stepsList.length !== 0 && (
          <div style={{ backgroundColor: "#ffffff" }}>
            {stepsList.map((item, index) => {
              return (
                <div className={classes.steps}>
                  <div
                    style={{
                      paddingLeft: "16px",
                      color: "#2564CF",
                      scale: "1.3",
                      cursor: "pointer",
                    }}
                  >
                    <MdOutlineRadioButtonUnchecked />
                  </div>
                  <p
                    style={{
                      flex: "1",
                      fontSize: "14px",
                      color: "#605E5C",
                      lineHeight: "20px",
                      fontFamily: "sans-serif",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {item.step}
                  </p>
                  <div
                    style={{
                      paddingRight: "16px",
                      color: "rgb(51,50,49)",
                      scale: "0.9",
                      cursor: "pointer",
                    }}
                  >
                    {<RxCross1 />}
                  </div>
                </div>
              );
            })}
            <hr
              style={{
                marginLeft: "32px",
                height: "1px",
                backgroundColor: "rgb(225,223,221)",
                border: "none",
              }}
            />
          </div>
        )}
        <div style={{ width: "100%", height: "fit-content" }}>
          <div className={classes.steps}>
            <div
              style={{
                paddingLeft: "16px",
                color: "#2564CF",
                scale: "1.3",
                cursor: "pointer",
              }}
            >
              <IoAddSharp />
            </div>
            <input
              className={classes.inputStep}
              placeholder="Next step"
              value={inputStep}
              onChange={(e) => setInputStep(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setStepsList((prevState) => [
                    ...prevState,
                    { step: inputStep },
                  ]);
                }
              }}
            />
          </div>
        </div>

        <span style={{ height: "8px" }} />

        <div style={{ width: "100%", height: "fit-content" }}>
          <DetailTab
            title={"Add to my Day"}
            content={"Added to my Day"}
            selected={selected.add_due_date}
            method={dueDate}
          />
        </div>
        <span style={{ height: "8px" }} />
        <div
          style={{
            width: "100%",
            height: "fit-content",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <div onClick={()=>{uiHandler();setReminderSelector(!reminderSelector)}}>
          <DetailTab
            title={"Remind Me"}
            content={
              <div>
                <p>Remind me at {"09:00"}</p>
                <p style={{ fontSize: "12px", color: "#605E5C" }}>Next Week</p>
              </div>
            }
            selected={selected.reminder}
            toggleSelected={toggleSelector}
          />
          </div>

          {reminderSelector && (
            <Overlay>
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
                <hr style={{ border: "0.5px solid #605E5C" }} />
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p
                    style={{ flex: "1" }}
                    onClick={() => {
                      setSelectedWeekday("Today");
                      setDateSelector(false);
                    }}
                  >
                    Today
                  </p>
                  <p>{currentWeekday}</p>
                </div>
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p
                    style={{ flex: "1" }}
                    onClick={() => {
                      setSelectedWeekday("Tomorrow");
                      setDateSelector(false);
                    }}
                  >
                    Tomorrow
                  </p>
                  <p>{nextCurrentWeekday}</p>
                </div>
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p style={{ flex: "1" }}>Next Week</p>
                  <p>Monday</p>
                </div>
                <hr style={{ border: "0.5px solid #605E5C" }} />
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p style={{ flex: "1" }}>Pick a Date</p>
                </div>
                <hr style={{ border: "0.5px solid #605E5C" }} />
                {true && (
                  <div
                    style={{ color: "#A80000" }}
                    className={classes.date_adders}
                  >
                    <GrPlan />
                    <p style={{ flex: "1" }}>Remove the Date</p>
                  </div>
                )}
              </div>
            </Overlay>
          )}

          <div onClick={()=>{uiHandler();setDateSelector(!dateSelector)}}>
          <DetailTab
            title={"Add Due Date"}
            content={"Add Due Date"}
            selected={selected.add_due_date}
            method={dueDateCustom}
          />
          </div>

          {dateSelector && (
            <Overlay>
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
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p
                    style={{ flex: "1" }}
                    onClick={() => {
                      setSelectedReminder("Today");
                      setReminderSelector(false);
                    }}
                  >
                    Today
                  </p>
                  <p>9:00</p>
                </div>
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p
                    style={{ flex: "1" }}
                    onClick={() => {
                      setSelectedReminder("Tomorrow");
                      setReminderSelector(false);
                    }}
                  >
                    Tomorrow
                  </p>
                  <p>{nextCurrentWeekday}, 9:00</p>
                </div>
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p
                    style={{ flex: "1" }}
                    onClick={() => {
                      setSelectedReminder("Next Week");
                      setReminderSelector(false);
                    }}
                  >
                    Next Week
                  </p>
                  <p>Monday, 9:00</p>
                </div>
                <hr style={{ border: "0.5px solid #605E5C" }} />
                <div className={classes.date_adders}>
                  <GrPlan />
                  <p
                    style={{ flex: "1" }}
                    onClick={() => {
                      setSelectedReminder("Customized");
                      setReminderSelector(false);
                    }}
                  >
                    Pick a date and time
                  </p>
                </div>
                <hr style={{ border: "0.5px solid #605E5C" }} />
                {true && (
                  <div
                    style={{ color: "#A80000" }}
                    className={classes.date_adders}
                  >
                    <GrPlan />
                    <p style={{ flex: "1" }}>Delete Reminder</p>
                  </div>
                )}
              </div>
            </Overlay>
          )}

          <div onClick={() => {uiHandler();setRepeatSelector(!repeatSelector)}}>
            <DetailTab
              title={"Repeat"}
              content={"Repeat"}
              selected={selected.repeat}
            />
          </div>
          {repeatSelector && (
            <Overlay>
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
            </Overlay>
          )}
        </div>
        <span style={{ height: "8px" }} />

        <div style={{ width: "100%", height: "fit-content" }}>
          <DetailTab
            title={"Pick a Category"}
            content={"Pick a Category"}
            selected={selectedDetailsTab}
          />
        </div>

        <span style={{ height: "8px" }} />

        <div style={{ width: "100%", height: "fit-content" }}>
          <DetailTab
            title={"Add a File"}
            content={"Add a File"}
            selected={selectedDetailsTab}
          />
        </div>

        <span style={{ height: "8px" }} />
      </div>

      {/*Final Icons*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <LuPanelRightClose style={{ cursor: "pointer" }} onClick={close} />
        <p
          style={{
            paddingLeft: "0px",
            color: "#605E5C",
            flexGrow: "1",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Created on {"20 Feb,2024"}
        </p>
        <AiOutlineDelete onClick={deleteToggler} />
      </div>
    </div>
  );
};

export default Details;
