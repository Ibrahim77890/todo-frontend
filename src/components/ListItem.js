import React, { useState } from 'react'
import classes from './ListItem.module.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { TbCircleCheckFilled } from "react-icons/tb";
import { LuCheckCircle2 } from "react-icons/lu";

const ListItem = ({completed, taskName, taskListName, starred, setCompleted, setStarred, uiUpdates}) => {
    const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    uiUpdates();
    setIsActive(!isActive);
  };

        return(
        <div className={`${isActive?classes.task_styling_active:classes.task_styling}`} onClick={handleClick}>
            <div style={{cursor: "pointer", color: "#2564CF", marginLeft: "8px", padding: "8px", scale: "1.3"}} onClick={(e)=>{e.stopPropagation(); setCompleted();}}>
                {completed && <TbCircleCheckFilled/>}
                {!completed && <LuCheckCircle2/>}
            </div>
            <div className={classes.fonts} style={{flex: "1", paddingLeft: "8px", lineHeight: "20px", color: "rgb(51,51,51)"}}>
                <p style={{fontSize: "14px"}}>{taskName}</p>
                <p style={{fontSize: "12px"}}>{taskListName}</p>
            </div>
            <div style={{marginRight: "24px", cursor: "pointer", color: "#2564CF"}} onClick={(e)=>{e.stopPropagation(); setStarred();}}>
                {starred && <FaStar/>}
                {!starred && <FaRegStar/>}
            </div>
       </div>
    );

}

export default ListItem
