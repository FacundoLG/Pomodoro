import React, { FC, ReactNode } from 'react'
import styles from "./header.module.css"
import {BsGearFill} from "react-icons/bs"
import Button from './Button'
import { useSelector } from 'react-redux'
interface Props {
    children: ReactNode
}

const Header:FC<Props> = ({children}) => {
  const {user} = useSelector( (state: any) => state)
  console.log(user)
  const isLogged = user.image_url && user.username && user.tkn
  return (
    <div className={styles.container}>
        <header className={styles.header}>
        {
        isLogged &&
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
            </div>
        }
            <BsGearFill className={styles.gear_icon}/>
        </header>
        <div style={{display: "flex", flexDirection: "column",width:"100%",height:"100%" }}>
        <div className={styles.in_out_buttons}>
            {
                isLogged ?
                <Button style='danger'>Log out</Button>
                :
                <>
                    <Button style="bordered">Sing in</Button>
                    <Button>Sing up</Button>
                </>
            }
        </div>
        {children}
        </div>
    </div>
  )
}

export default Header