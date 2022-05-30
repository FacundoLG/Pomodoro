import React, { useEffect, useState } from 'react'
import { BsSave } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import { SET_ACTIVE_PRESET, SET_PRESETS } from '../redux/types'
import styles from "./presets.module.css"
import { Preset as PresetType } from '../types'
import Preset from '../components/Preset'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'


const Presets = () => {
    const {presets,user} = useSelector((state:any) => state)
    console.log(presets)
    const dispatch = useDispatch()
    const {data,error,loading,Exec,Clean } = useFetch({
        url: import.meta.env["VITE_SERVER_URL"] + "presets",
        method: "GET"
    })

    const [pomodoroTime,setPomodoroTime] = useState(30)
    const [shortBreakTime,setShortBreakTime] = useState(5)
    const [longBreakTime,setLongBreakTime] = useState(20)
    const [shortsPerLong,setShortsPerLong] = useState(2)
    const [pomodoroName,setPomodoroName] = useState("")
    const navigate = useNavigate()

    const refreshData = () => {
        const getHeader:HeadersInit = new Headers()
        getHeader.append("Authorization","bearer "+user.tkn)
        Exec(
            {
             headers: getHeader, 
             method:"GET"  
            }
        )
    }

    useEffect(() => {
        if(user?.tkn){
            refreshData()
        }
    },[])
    useEffect(() => {
        if(Array.isArray(data)){
            dispatch({
                type: SET_PRESETS,
                payload: data
            })
        }
    },[data])
    const savePreset = () => {
        const newPreset:PresetType = {
            name: pomodoroName || "new preset",
            pomodoro_time: pomodoroTime,
            short_break_time: shortBreakTime,
            long_break_time: longBreakTime,
            shorts_per_long: shortsPerLong
        }
        if (!user.tkn){
            dispatch({
                type: SET_ACTIVE_PRESET,
                payload: newPreset
            })
            navigate("/pomodoro")
            return
        }
        //API ENDPOINT CALL 

        const postHeader:HeadersInit = new Headers()
        postHeader.append("Content-Type","application/json")
        postHeader.append("Authorization","bearer "+ user.tkn)
        const postBody = JSON.stringify(newPreset)
        Exec({
            method: "POST",
            body: postBody,
            headers: postHeader,
        })
    }

    const deletePreset = (id: string | number | undefined) => {
       // API ENDPOINT CALL
    }
    return (
        <div className={styles.presets}>
            <div className={styles.preset_creator}>
                <div>
                    <div style={{width: "100%"}}>
                        <label htmlFor="">Name</label>
                        <input 
                        className={styles.input}
                        type="text"
                        value={pomodoroName}
                        onChange={(e) => {setPomodoroName(e.target.value) }}
                        />
                    </div>
                </div>
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
                {
                    !user.tkn &&
                    <p>You need and account to save presets</p>
                }
            </div>
        </div>
  )
}

export default Presets