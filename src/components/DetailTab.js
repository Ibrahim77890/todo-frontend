import React from 'react'
import classes from './Details.module.css';

import { BsBrightnessHigh } from "react-icons/bs";
import { GrPlan } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsRepeat } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { GrAttachment } from "react-icons/gr";

const DetailTab = ({title, content, selected, toggleSelected, method}) => {
    const renderIcon = () => {
        switch (title) {
            case "Add to my Day":
                return selected?<BsBrightnessHigh style={{color: "#2564CF"}}/>:<BsBrightnessHigh style={{color: "#605E5C"}}/>;

            case "Remind Me":
                return selected?<GrPlan style={{color: "#2564CF"}}/>:<GrPlan style={{color: "#605E5C"}}/>;

            case "Add Due Date":
                return selected?<IoMdNotificationsOutline style={{color: "#2564CF"}}/>:<IoMdNotificationsOutline style={{color: "#605E5C"}}/>;

            case "Repeat":
                return selected?<BsRepeat style={{color: "#2564CF"}}/>:<BsRepeat style={{color: "#605E5C"}}/>;

            case "Pick a Category":
                return selected?<CiShoppingTag style={{color: "#2564CF"}}/>:<CiShoppingTag style={{color: "#605E5C"}}/>;

            case "Add a File":
                return selected?<GrAttachment style={{color: "#2564CF"}}/>:<GrAttachment style={{color: "#605E5C"}}/>;


            default:
                break;
        }
    }

    if(title === 'Add to my Day'){

    }

  return (
      <div style={{position: "relative"}} className={classes.stepsButton} onClick={method}>
              <div className={classes.iconDetail}
                style={{
                  paddingLeft: "16px",
                  scale: "1.0",
                  cursor: "pointer"
                }}
              >
                {renderIcon()}
              </div>
              {!selected && <div
                style={{
                  flex: "1",
                  fontSize: "14px",
                  color: "#605E5C",
                  lineHeight: "20px",
                  fontFamily: "sans-serif",
                  letterSpacing: "0.3px",
                  paddingLeft: "8px"
                }}
              >
                {title}
              </div>}
              {selected && <div
                style={{
                  flex: "1",
                  fontSize: "14px",
                  color: "#2564CF",
                  lineHeight: "20px",
                  fontFamily: "sans-serif",
                  letterSpacing: "0.3px",
                  paddingLeft: "8px"
                }}
              >
                {content}
              </div>}
            </div>
  )
}

export default DetailTab
