import React from 'react'
import classes from './Header.module.css';
import { SlSettings } from "react-icons/sl";
import { RxQuestionMark } from "react-icons/rx";
import { AiOutlineNotification } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";

const Header = () => {
  return (
    <div className={classes.header_content}>
        <div className={classes.header_left}>
        <div className={classes.header_icon}><CgMenuGridO className={classes.header_styled_icon}/></div>
            <p className={classes.header_title}>To Do</p>
        </div>
        <div className={classes.header_right}>
            <div className={classes.header_icon}><SlSettings className={classes.header_styled_icon}/></div>
            <div className={classes.header_icon}><RxQuestionMark className={classes.header_styled_icon}/></div>
            <div className={classes.header_icon}><AiOutlineNotification className={classes.header_styled_icon}/></div>
            <div className={classes.header_profile}><p>IQ</p></div>
        </div>
    </div>
  )
}

export default Header
