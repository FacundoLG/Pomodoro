import React, { FC, ReactNode } from 'react'
import styles from "./header.module.css"
import {BsGearFill, BsHouse} from "react-icons/bs"
import Button from './Button'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
interface Props {
    children: ReactNode
}

const Header:FC<Props> = ({children}) => {
  const navigate = useNavigate()
  const {user} = useSelector( (state: any) => state)
  console.log(user)
  const isLogged = user.image_url && user.username && user.tkn
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <Link to={"/pomodoro"} style={{textDecoration:"none"}} >
                <p className={styles.pomodoro}>Pomodoro</p>
            </Link>
        
            <div className={styles.buttons_container}>
                {
                isLogged &&
                 <>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                    </div>
                    {/* <BsGearFill className={styles.gear_icon}/>
                     <Link to="/pomodoro">
                        <BsHouse className={styles.gear_icon} />
                     </Link>
                    */}
                 </>
                }
            {
                isLogged ?
                <Button style='danger'>Log out</Button>
                :
                <>
                    <Button style="bordered" onClick={() => {
                        navigate("/singin")
                    }} >Singin</Button>
                    <Button onClick={() => {
                        navigate("/singup")
                    }}>Singup</Button>
                </>
            }
            </div>
        </header>
        <div style={{display: "flex", flexDirection: "column",width:"100%",height:"100%" }}>
            {children}
        </div>
    </div>
  )
}

export default Header