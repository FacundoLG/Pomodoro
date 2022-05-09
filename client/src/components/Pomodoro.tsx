/* Components */
import { FC, useEffect, useState } from 'react'
import { BsGearFill, BsX } from 'react-icons/bs'
/* IMG - SVG */
import PlayIMG from "../assets/images/Play_icon.png"
import ProgressBar from './ProgressBar'
/* Sounds */
import Sound from "../assets/sounds/sound-1.wav"
import Sound2 from "../assets/sounds/sound-2.wav"
import Sound3 from "../assets/sounds/sound-3.wav"
/* Styles */
import styles from "./pomodoro.module.css"
import Button from './Button'

import {calculate_percentage,fix_one_digit,sec_with_minutes} from '../utils/clock'

type pomodoroState = "awaiting" | "active"

interface Stage {
    name: "Long break" | "Short break" | "Pomodoro"
    duration_sec: number
    status: "active" | "waiting" | "finished"
}

interface ActualStageWithMetaData {
    stage: Stage
    stage_index: number
    stages_length: number
}

interface ClockData {
    minutes: string,
    seconds: string,
    percentage: number,
    index?: number,
    name?: string
}
const lessValue = 30
const stagesMock: Array<Stage> = [
    {
        name: "Pomodoro",
        duration_sec: 1500 / lessValue,
        status: "waiting" 
    },
    {
        name: "Short break",
        duration_sec: 300 / lessValue,
        status: "waiting"
    },
    {
        name: "Pomodoro",
        duration_sec: 1500 / lessValue,
        status: "waiting"
    },
    {
        name: 'Short break',
        duration_sec: 300 / lessValue,
        status: "waiting"
    },
    {
        name: 'Pomodoro',
        duration_sec: 1500 / lessValue,
        status: "waiting"
    },
    {
        name: 'Short break',
        duration_sec: 300 / lessValue,
        status: "waiting"
    },
    {
        name: 'Pomodoro',
        duration_sec: 1500 / lessValue,
        status: "waiting"
    },
    {
        name: 'Long break',
        duration_sec: 1200 / lessValue,
        status: "waiting"
    }, 
]

 

const Pomodoro:FC = () => {
  const [pomodoroState,setPomodoroState] = useState<pomodoroState>("awaiting")
  const [pomodoroStages,setPomodoroStages] = useState<Array<Stage>>(stagesMock)
  const [clockData,setClockData] = useState<ClockData>()
  const startPomodoro = () => {
      setPomodoroState("active") 
  }

  const stopPomodoro = () => {
      setPomodoroState("awaiting")
  }

  useEffect(() => {
        let stage= pomodoroStages[0]
        let stage_index= 0
        const stages_length= pomodoroStages.length
        let sec: number = stage.duration_sec || 1
        const clockInterval = setInterval(() => {
            const {minutes,seconds} = sec_with_minutes(sec)
            const percentage = calculate_percentage(sec,stage.duration_sec || 0)
            const fixed_minutes =fix_one_digit(minutes)
            const fixed_seconds =fix_one_digit(seconds)
            console.log(minutes,seconds,percentage)
            setClockData({
                minutes: fixed_minutes,
                seconds: fixed_seconds,
                percentage: percentage,
                index: stage_index,
                name:stage.name
            })
            if (pomodoroState == "awaiting") {
                clearInterval(clockInterval)
                return
            }
            document.title = `${fixed_minutes}:${fixed_seconds}-${stage.name}`
            if (sec <= 0) {
                stage_index++
                if (stage_index > stages_length - 1){
                    stopPomodoro()
                    return
                }
                stage = pomodoroStages[stage_index]
                sec = stage.duration_sec
            }
            sec--
            },1000)
      return () => {
          clearInterval(clockInterval)
          document.title="Pomodoro"
      }
  },[pomodoroState])
  
  return (
      <div className={styles.pomodoro}>
        <div className={styles.data}>
            {
            pomodoroState === "active" &&
                <p className={styles.stage_name}>{clockData?.name}</p>   
            }
        </div>
        <div className={styles.main_part}>
            <div className={`${styles.clock} ${ styles.start_button} ` } onClick={() => {startPomodoro()} }>
            { pomodoroState == "awaiting"?
               <>
                        <img src={PlayIMG} alt="" />
               </>
                :
                <>
                    <ProgressBar percentage={clockData?.percentage || 1} minutes={clockData?.minutes} seconds={clockData?.seconds} />
                </>
            }
            </div>
        </div>
        <div className={styles.controller}>
            { pomodoroState == "awaiting"?
                <div>
                    <BsGearFill className={styles.config_icon}/>
                </div>
                :
                <>
                    <div className={styles.stages}>
                        {stagesMock.map((stage,i) => 
                            <div key={i+ "stage"} className={`${i === clockData?.index && styles.active_stage}`} ></div>
                            )}
                    </div> 
                    <Button style='fill' onClick={()=>{ stopPomodoro()}} ><BsX/></Button>
                </>
            }
        </div>
    </div>
    )
}

export default Pomodoro