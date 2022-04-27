import React, { useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import styles from "./pomodoro.module.css"
import PlayIMG from "../assets/images/Play_icon.png"
type PomodoroState = "inactive" | "config" | "active"

const Pomodoro = () => {
  const [pomodoroState,setPomodoroState] = useState<PomodoroState>("inactive")
  
  return (
    <div className={styles.pomodoro}>
        <div className={styles.data}>

        </div>
        <div className={styles.main_part}>
                <button className={styles.start_button}>
                    <img src={PlayIMG} alt="" />  
                </button>
                <div>
                    <BsGearFill className={styles.config_icon}/>
                </div>
        </div>
        <div className={styles.controler}>

        </div>
    </div>
    )
}

export default Pomodoro