import React, { useEffect, useState } from 'react'
import { BsSave } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { SET_PRESETS } from '../redux/types'
import styles from "./presets.module.css"
import { Preset as PresetType } from '../types'
import Preset from '../components/Preset'


const Presets = () => {
    const {presets,user} = useSelector((state:any) => state)
    console.log(presets)
    const dispatch = useDispatch()
    let localPresets: Array<PresetType> =[]
    useEffect(() => {
        if (user.tkn) {
            // Get cloud presets
        }else{
            dispatch({
                type: SET_PRESETS,
                payload: localPresets = JSON.parse(localStorage.getItem("presets") || "[]" ) 
            })
        }  
    },[])
    const [pomodoroTime,setPomodoroTime] = useState(30)
    const [shortBreakTime,setShortBreakTime] = useState(5)
    const [longBreakTime,setLongBreakTime] = useState(20)
    const [shortsPerLong,setShortsPerLong] = useState(2)

    const savePreset = () => {
        const newPreset:PresetType = {
            local_id: Math.floor(Math.random() * 100) + Date.now(),
            name: "new preset",
            pomodoro_time: pomodoroTime,
            short_break_time: shortBreakTime,
            long_break_time: longBreakTime,
            shorts_per_long: shortsPerLong
        } 
        const storePresets:Array<PresetType> = presets.presets
        storePresets.push(newPreset)
        localStorage.setItem("presets",JSON.stringify(storePresets))
        dispatch({
            type: SET_PRESETS,
            payload: storePresets
        })     
    }

    const deletePreset = (id: string | number | undefined) => {
       const newPresets = presets.presets.filter((preset:PresetType) => preset.local_id !== id)
       localStorage.setItem("presets",JSON.stringify(newPresets))
       dispatch({
           type:SET_PRESETS,
           payload: newPresets
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
                {presets.presets.map((data:PresetType,index:number) => 
                   <Preset onDelete={deletePreset} onPlay={console.log} onEdit={console.log} key={data.name + "_" + index} {...data} />
                )}
            </div>
        </div>
  )
}

export default Presets