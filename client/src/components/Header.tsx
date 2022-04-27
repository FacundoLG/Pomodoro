import React, { FC, ReactNode } from 'react'
import styles from "./header.module.css"
import {BsGearFill} from "react-icons/bs"
import Button from './Button'

interface Props {
    children: ReactNode
}

const Header:FC<Props> = ({children}) => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
            </div>
            <BsGearFill className={styles.gear_icon}/>
        </header>
        <div style={{display: "flex", flexDirection: "column",width:"100%",height:"100%" }}>
        <div className={styles.in_out_buttons}>
            <Button style="bordered">Sing in</Button>
            <Button>Sing up</Button>
        </div>
        {children}
        </div>
    </div>
  )
}

export default Header