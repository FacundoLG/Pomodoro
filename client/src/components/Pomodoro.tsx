import { FC, useEffect, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import styles from "./pomodoro.module.css"
import PlayIMG from "../assets/images/Play_icon.png"
import ProgressBar from './ProgressBar'

type PomodoroPage = "home" | "clock"

interface Stage {
    name: "Long break" | "Short break" | "Pomodoro"
    duration_seg: number
    status: "active" | "waiting" | "finished"
}

const stagesMock: Array<Stage> = [
    {
        name: "Pomodoro",
        duration_seg: 1800,
        status: "waiting" 
    },
    {
        name: "Short break",
        duration_seg: 300,
        status: "waiting"
    },
    {
        name: "Pomodoro",
        duration_seg: 1800,
        status: "waiting"
    },
    {
        name: 'Long break',
        duration_seg: 600,
        status: "waiting"
    },
]

const Pomodoro:FC = () => {
  const [pomodoroPage,setPomodoroPage] = useState<PomodoroPage>("home")
  const [stages,setStages] = useState<Array<Stage>>(stagesMock)
  const [clockTime,setClockTime] = useState<string>("")
  const startGame = () => {
      setPomodoroPage("clock")
      startClock(stages)
}
  const startClock = (stages:Array<Stage>) => {
    stages.map((stage) => {
        if(stage.status !== "waiting"){
            let segs = stage.duration_seg
             setInterval(() => {    
                const minutes = Math.floor(segs / 60)
                console.log(segs / 60)
                setClockTime((minutes).toString() )
                segs--
            },1000)
        }
    })
  }


  return (
    <div className={styles.pomodoro}>
        <div className={styles.data}>
        </div>
        <div className={styles.main_part}>
            {pomodoroPage == "home" &&
               <>
                    <div className={`${styles.clock} ${ styles.start_button} ` } onClick={() => {startGame()} }>
                        <img src={PlayIMG} alt="" />
                    </div>
               </>
            }
            {
                pomodoroPage == "clock" &&
                <>
                <div className={styles.clock}>
                    <ProgressBar percentage={90} minutes={clockTime} seconds={"00"}/>
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
            {
                pomodoroPage == "clock" &&
                <div className={styles.stages}>
                    {stagesMock.map((_,i) => 
                        <div key={i+ "stage"}></div>
                    )}
                </div>
            }
        </div>
    </div>
    )
}

export default Pomodoro