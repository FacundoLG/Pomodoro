/* Components */
import { FC, useEffect, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
/* IMG - SVG */
import PlayIMG from "../assets/images/Play_icon.png"
import ProgressBar from './ProgressBar'
/* Sounds */
import Sound from "../assets/sounds/sound-1.wav"
import Sound2 from "../assets/sounds/sound-2.wav"
import Sound3 from "../assets/sounds/sound-3.wav"
/* Styles */
import styles from "./pomodoro.module.css"
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

interface ClockData {
    minutes: string,
    seconds: string,
    percentage: number
}

const stagesMock: Array<Stage> = [
    {
        name: "Pomodoro",
        duration_sec: 1500,
        status: "waiting" 
    },
    {
        name: "Short break",
        duration_sec: 300,
        status: "waiting"
    },
    {
        name: "Pomodoro",
        duration_sec: 1500,
        status: "waiting"
    },
    {
        name: 'Short break',
        duration_sec: 300,
        status: "waiting"
    },
    {
        name: 'Pomodoro',
        duration_sec: 1500,
        status: "waiting"
    },
    {
        name: 'Short break',
        duration_sec: 300,
        status: "waiting"
    },
    {
        name: 'Pomodoro',
        duration_sec: 1500,
        status: "waiting"
    },
    {
        name: 'Long break',
        duration_sec: 1200,
        status: "waiting"
    }, 
]

 

const Pomodoro:FC = () => {
  const [pomodoroPage,setPomodoroPage] = useState<PomodoroPage>("home")
  const [stages,setStages] = useState<Array<Stage>>(stagesMock)
  const [actualStage,setActualStage] = useState<ActualStageMetaData>()
  const [clockData,setClockData] = useState<ClockData>()
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
    const start_sound = new Audio(Sound3)
    start_sound.play()
    let seg = actualStage.stage.duration_sec
    const clockInterval = setInterval(() => {
          if(seg <= 0){
              if(actualStage.stage_index == actualStage.stages_length - 1){
                const finish_clock_sound = new Audio(Sound)
                finish_clock_sound.play()  
                setPomodoroPage("home")
                  document.title = "Pomodoro" 
              }
              else{
                  const finish_stage_sound = new Audio(Sound2)
                  finish_stage_sound.play()
                   setActualStage({
                          ...actualStage,
                          stage: stages[actualStage.stage_index + 1],
                          stage_index: actualStage.stage_index + 1,
                      })
              }
              clearInterval(clockInterval)
          }
          const percentage = seg/ ((actualStage.stage.duration_sec) / 100)
          console.log(percentage)
          const minutes = Math.floor(seg / 60)
          const seconds = seg - 60 * minutes
          document.title = `${fix_one_digit(minutes)}:${fix_one_digit(seconds)}-${actualStage.stage.name}`
          setClockData({
              minutes: fix_one_digit(minutes),
              seconds: fix_one_digit(seconds),
              percentage
            })
          seg--
            return () => {
            clearInterval(clockInterval)
            setPomodoroPage("clock")
        }
    },1000)
  
  },[actualStage])


  return (
    <div className={styles.pomodoro}>
        <div className={styles.data}>
            {
                pomodoroPage === "clock" &&
                <p className={styles.stage_name}>{actualStage?.stage.name}</p>   
            }
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
                <div className={`${styles.clock} ${styles.pomodoro_clock}`}>
                    <ProgressBar percentage={clockData?.percentage || 0} minutes={clockData?.minutes} seconds={clockData?.seconds}/>
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
                    {stagesMock.map((stage,i) => 
                        <div key={i+ "stage"} className={`${i === actualStage?.stage_index && styles.active_stage}`} ></div>
                    )}
                </div>
            }
        </div>
    </div>
    )
}

export default Pomodoro