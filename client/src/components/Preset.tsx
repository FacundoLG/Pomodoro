import {FC} from 'react'
import styles from "./preset.module.css"
import { Preset as PresetType } from '../types'
import Button from './Button'
import { BsPlay, BsX } from 'react-icons/bs'

interface PresetComponent extends PresetType{
    onPlay: (preset_data:PresetType) => void
    onDelete: (id:string | number | undefined) => void
    onEdit: () => void
}

const Preset:FC<PresetComponent> = (props) => {
  const {
    long_break_time,name,pomodoro_time,short_break_time,
    shorts_per_long,id,user_id
  } = props
  const calculateTime = () => {
    return (pomodoro_time + short_break_time) * shorts_per_long + pomodoro_time + long_break_time    
  }
  return (
    <div className={styles.preset}>
        <div className={styles.preset_info}>
            <p className={styles.preset_name}>{name}</p>
            <p>{calculateTime() + " Minutes"}</p>
        </div>
        <div>
            <Button style='icon' onClick={() => { props.onDelete(props.id)}} > <BsX/> </Button>
            <Button style='icon'> <BsPlay/> </Button>
        </div>
    </div>
  )
}

export default Preset