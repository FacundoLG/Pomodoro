import {FC} from 'react'
import styles from "./preset.module.css"
import { Preset as PresetType } from '../types'
import Button from './Button'
import { BsPlay, BsX } from 'react-icons/bs'


const Preset:FC<PresetType> = (props) => {
  const {
    long_break_time,name,pomodoro_time,short_break_time,
    shorts_per_long,id,local_id,user_id
  } = props
  const calculateTime = () => {
    return (pomodoro_time + short_break_time) * shorts_per_long - short_break_time + pomodoro_time + long_break_time    
  }
  return (
    <div className={styles.preset}>
        <div className={styles.preset_info}>
            <p>{name}</p>
            <p>{calculateTime() + " Minutes"}</p>
        </div>
        <div>
            <Button style='icon'> <BsX/> </Button>
            <Button style='icon'> <BsPlay/> </Button>
        </div>
    </div>
  )
}

export default Preset