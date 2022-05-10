import React, { useState } from 'react'
import { BsSave } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { SET_PRESETS } from '../redux/types'
import styles from "./presets.module.css"

interface Preset {
    id?: number
    name: string
    pomodoro_time: number
    short_break_time: number
    long_break_time: number
    shorts_per_long: number
}

const Presets = () => {
    const {presets} = useSelector((state:any) => state)
    console.log(presets)
    const dispatch = useDispatch()

    let localPresets:Array<Preset> = JSON.parse(localStorage.getItem("presets") || "[]" ) 
   
    const [savedPresets,setSavedPresets] = useState<Array<Preset>>(localPresets)
    const [pomodoroTime,setPomodoroTime] = useState(30)
    const [shortBreakTime,setShortBreakTime] = useState(5)
    const [longBreakTime,setLongBreakTime] = useState(20)
    const [shortsPerLong,setShortsPerLong] = useState(2)
    
    // Todo
    // Save presets in local
    // Check if is logged, and sync presets
    // 

    const savePreset = () => {
     const newPreset:Preset = {
        name: "new preset",
        pomodoro_time: pomodoroTime,
        short_break_time: shortBreakTime,
        long_break_time: longBreakTime,
        shorts_per_long: shortsPerLong
     } 
     const storePresets:Array<Preset> = presets.presets
     storePresets.push(newPreset)
     localStorage.setItem("presets",JSON.stringify(storePresets))
     dispatch({
         type: SET_PRESETS,
         payload: storePresets
     })     


    }

    return (
        <div className={styles.presets}>
            <div className={styles.preset_creator}>
                <div className={styles.creator_top}>
                    <div>
                        <label>Pomodoro</label>
                        <input 
                        type="number" 
                        onChange={(e) => { setPomodoroTime(parseInt(e.target.value))}}
                        value={pomodoroTime}
                        />
                    </div>
                    <div>
                        <label>Short break</label>
                        <input
                        type="number" 
                        onChange={(e) => { setShortBreakTime(parseInt(e.target.value))}}
                        value={shortBreakTime}
                        />
                    </div>
                    <div>
                        <label>Long break</label>
                        <input
                        type="number" 
                        onChange={(e) => { setLongBreakTime(parseInt(e.target.value))}}
                        value={longBreakTime}
                        />
                    </div>
                </div>
                <div className={styles.creator_bottom}>
                    <div>
                        <input 
                        type="number" 
                        onChange={(e) => { setShortsPerLong(parseInt(e.target.value))}}
                        value={shortsPerLong}
                        />
                        <label htmlFor=""> per long break</label>
                    </div>
                    <Button style="icon" onClick={savePreset}> <BsSave/> </Button>
                </div>
            </div>
            <div className={styles.presets_list}>
                {savedPresets.map((data:Preset,index) => 
                    <div key={data.name + "_" + index}>
                        <p>{data.name}</p>
                        <p>{((data.pomodoro_time + data.short_break_time) * 2 + data.long_break_time) + " minutes"  }</p>
                    </div>
                )}
            </div>
        </div>
  )
}

export default Presets