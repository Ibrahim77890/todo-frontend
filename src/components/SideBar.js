import classes from "./SideBar.module.css";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsBrightnessHigh } from "react-icons/bs";
import { PiStar } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { VscCombine } from "react-icons/vsc";
import { IoIosList } from "react-icons/io";

import { useEffect, useRef, useState } from "react";

const SideBar = ({
  sidebar,
  toggleSidebar,
  currentTab,
  toggleTab,
  tasksList,
  specialLists,
  setSpecialLists,
  setCurrentList
}) => {
  // const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [userLists, setUserLists] = useState([]);
  const inputRef = useRef();

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('http://localhost:5001/lists', {
          method: 'GET'
        });
        const data = await response.json();
        console.log('Data received');
        setUserLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
    console.log(userLists.length);
    const intervalId = setInterval(fetchLists, 8000); // Poll every 5 seconds

  // Cleanup the interval when the component unmounts
  return () => clearInterval(intervalId);
},[]);



const addList = async () => {
  try {
    // Verify the value of inputValue
    console.log("inputValue:", inputValue);

    // Ensure the inputValue is not empty
    if (!inputValue) {
      console.error("Please enter a name for the list.");
      return; // Early exit if input is invalid
    }

    const response = await fetch('http://localhost:5001/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputValue,
        tasks: [],
      }),
    });

    if (response.ok) {
      const newList = await response.json();
      console.log(newList);
      setInputValue(''); // Clear the input field
    } else {
      console.error("Error adding list:", await response.text()); // Log the error message
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};


  return (
    sidebar && (
      <nav className={classes.side}>
        <RxHamburgerMenu
          className={classes.side_icon}
          onClick={() => toggleSidebar()}
        />
        <ul className={classes.side_list}>
          <li
            className={`${
              currentTab === "My Day" ? classes.list_item_active : classes.list_item
            }`}
            onClick={() => {setSpecialLists("My Day")}}
          >
            <div className={classes.side_item}>
              <BsBrightnessHigh style={{scale: "1.3"}}/>
              <p className={classes.side_num}>My Day</p>
            </div>
            <p className={classes.side_num}>{tasksList.filter((task)=>task.add_due_date).length}</p>
          </li>
          <li
            className={`${
                currentTab === "Important" ? classes.list_item_active : classes.list_item
              }`}
            onClick={() => {setSpecialLists("Important")}}
          >
            <div className={classes.side_item}>
              <PiStar style={{scale: "1.3"}}/>
              <p className={classes.side_num}>Important</p>
            </div>
            <p className={classes.side_num}>{tasksList.filter((task) => task.important).length}</p>
          </li>
          <li
            className={`${
                currentTab === "Planned" ? classes.list_item_active : classes.list_item
              }`}
            onClick={() => {setSpecialLists("Planned")}}
          >
            <div className={classes.side_item}>
              <AiOutlineSchedule style={{scale: "1.3"}}/>
              <p className={classes.side_num}>Planned</p>
            </div>
            <p className={classes.side_num}>1</p>
          </li>
          <li
            className={`${
                currentTab === "Assigned to me" ? classes.list_item_active : classes.list_item
              }`}
            onClick={() => {setSpecialLists("Assigned to me")}}
          >
            <div className={classes.side_item}>
              <GoPerson style={{scale: "1.3"}}/>
              <p className={classes.side_num}>Assigned to me</p>
            </div>
            <p className={classes.side_num}>1</p>
          </li>
          <li className={`${
              currentTab === "Tasks" ? classes.list_item_active : classes.list_item
            }`} onClick={() => {setSpecialLists("Tasks")}}>
            <div className={classes.side_item}>
              <GoHome style={{scale: "1.3"}}/>
              <p className={classes.side_num}>Tasks</p>
            </div>
            <p className={classes.side_num}>{tasksList.filter((task) => task.category === 'Tasks').length}</p>
          </li>
        </ul>
        <div style={{display: "flex", flexDirection: "row", backgroundColor: "transparent", width: "100%"}}>
        <span style={{width: "16px"}}/>
        <span className={classes.line} />
        <span style={{width: "16px"}}/>
        </div>
        <ul className={classes.side_list}>
            {userLists?.length !== 0 && userLists?.map((item, index)=>{
                return <li className={`${
                    currentTab === item.name ? classes.list_item_active : classes.list_item
                  }`} onClick={() => {toggleTab(item._id); console.log(currentTab);}}>
                    <div className={classes.side_item}>
                        <IoIosList style={{scale: "1.5"}}/>
                        <p>{item.name}</p>
                    </div>
                    <p>{item?.tasks?.length}</p>
                </li>
            })}
        </ul>
        <ul className={classes.side_list}>
          <li>
            <div className={classes.side_item_selector}>
              <div className={classes.side_item_selector_left}>
                <GrAdd
                  style={{
                    scale: "1.3",
                    marginRight: "8px"
                  }}
                />
                <input
                  placeholder="New List"
                  ref={inputRef}
                  className={classes.input_selector}
                  value={inputValue}
                  onChange={e=>inputHandler(e)}
                  onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        addList();
                        inputRef.current.blur();
                    }
                  }}
                />
              </div>
              <div className={classes.side_item_selector_right}>
                <VscCombine />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    )
  );
};

export default SideBar;
