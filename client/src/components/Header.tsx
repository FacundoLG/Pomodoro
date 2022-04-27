import React from 'react'
import styles from "./header.module.css"
import {BsGearFill} from "react-icons/bs"
import Button from './Button'
const Header = () => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
            </div>
            <BsGearFill className={styles.gear_icon}/>
        </header>
        <div className={styles.in_out_buttons}>
            <Button style="bordered">Sing in</Button>
            <Button>Sing up</Button>
        </div>
    </div>
  )
}

export default Header