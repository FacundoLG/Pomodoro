import { FC, useEffect, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import styles from "./pomodoro.module.css"
import PlayIMG from "../assets/images/Play_icon.png"
import ProgressBar from './ProgressBar'

type PomodoroPage = "home" | "clock"

interface Stage {
    name: "Long break" | "Short break" | "Pomodoro"
    duration_sec: number
    status: "active" | "waiting" | "finished"
}

interface ActualStageMetaData {
    stage: Stage
    stage_index: number
    stages_length: number
}

interface ClockTime {
    minutes: string,
    seconds: string
}

const stagesMock: Array<Stage> = [
    {
        name: "Pomodoro",
        duration_sec: 20,
        status: "waiting" 
    },
    {
        name: "Short break",
        duration_sec: 10,
        status: "waiting"
    },
    {
        name: "Pomodoro",
        duration_sec: 20,
        status: "waiting"
    },
    {
        name: 'Long break',
        duration_sec: 10,
        status: "waiting"
    },
]

 

const Pomodoro:FC = () => {
  const [pomodoroPage,setPomodoroPage] = useState<PomodoroPage>("home")
  const [stages,setStages] = useState<Array<Stage>>(stagesMock)
  const [actualStage,setActualStage] = useState<ActualStageMetaData>()
  const [isStageFinished,setIsStageFinished] = useState<boolean>(true)
  const [clockTime,setClockTime] = useState<ClockTime>()
  const startGame = () => {
      setPomodoroPage("clock")
      setActualStage({
          stage: stages[0],
          stage_index: 0,
          stages_length: stages.length 
      })
  }

  function fix_one_digit (num:number): string {
    if (num >= 0 && num < 10){
        return "0"+(num.toString()) 
    }
    return num.toString()
  } 

  useEffect(() => {
    if (!actualStage) return
    let seg = actualStage.stage.duration_sec
    const clockInterval = setInterval(() => {
        if(seg <= 0){
            if(actualStage.stage_index == actualStage.stages_length - 1){
                setPomodoroPage("home")   
            }
            else{
                setActualStage({
                    ...actualStage,
                    stage: stages[actualStage.stage_index + 1],
                    stage_index: actualStage.stage_index + 1,
                })
            }
            clearInterval(clockInterval)
        }
        const minutes = Math.floor(seg / 60)
        const seconds = seg - 60 * minutes
        setClockTime({
            minutes: fix_one_digit(minutes),
            seconds: fix_one_digit(seconds)
        })
        seg--
        return () => {
            clearInterval(clockInterval)
        }
    },1000)
  
  },[actualStage])


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
                    <ProgressBar percentage={90} minutes={clockTime?.minutes} seconds={clockTime?.seconds}/>
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