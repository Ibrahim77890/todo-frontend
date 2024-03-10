import React from 'react'
import Header from '../components/Header'
import MainContent from '../components/MainContent';
import classes from './HomePage.module.css';
import { TasksProvider } from '../provider/TasksProvider';


const HomePage = () => {
  return (
    <div className={classes.hp}>
        <Header/>
        <TasksProvider>
            <MainContent />
        </TasksProvider>
    </div>
  )
}

export default HomePage
