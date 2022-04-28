import React, { MouseEvent, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import styles from "./pomodoro.module.css"
import PlayIMG from "../assets/images/Play_icon.png"
import ProgressBar from './ProgressBar'

type PomodoroState = "inactive" | "config" | "starting" | "start"
type PomodoroPage = "home" | "clock"
const Pomodoro = () => {
  const [pomodoroState,setPomodoroState] = useState<PomodoroState>("inactive")
  const [pomodoroPage,setPomodoroPage] = useState<PomodoroPage>("home")

  const startGame = () => {
    setPomodoroPage("clock")
    setPomodoroState("starting")
  }

  return (
    <div className={styles.pomodoro}>
        <div className={styles.data}>
        </div>
        <div className={styles.main_part}>
            {pomodoroPage == "home" &&
               <>
                    <div className={`${styles.clock} ${pomodoroState == "inactive" ? styles.start_button: styles.pomodoro_clock} ` } onClick={() => {startGame()} }>
                        <img src={PlayIMG} alt="" />
                    </div>
               </>
            }
            {
                pomodoroPage == "clock" &&
                <>
                <div className={styles.clock}>
                    <ProgressBar percentage={75}/>
                </div>
                </>
            }
        </div>
        <div className={styles.controller}>
            {pomodoroPage == "home" &&
                <div>
                    <BsGearFill className={styles.config_icon}/>
                </div>
            }
        </div>
    </div>
    )
}

export default Pomodoro