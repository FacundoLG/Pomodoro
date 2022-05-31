import React, { FC, ReactNode } from 'react'
import styles from "./header.module.css"
import {BsGearFill, BsHouse} from "react-icons/bs"
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SET_USER_DATA } from '../redux/types'
interface Props {
    children: ReactNode
}

const Header:FC<Props> = ({children}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector( (state: any) => state)
  const isLogged =  user.username && user.tkn
  
  const LogOut = () => {
    dispatch({
        type: SET_USER_DATA,
        payload:{
            username: null,
            tkn: null,
            image_url: null
        }
    })
    navigate("/pomodoro")
  }
  
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
                        <div className={styles.user}>
                            {user?.username[0]}
                        </div>
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
                <Button style='danger' onClick={() => {
                    LogOut()
                }}>Log out</Button>
                :
                <>
                    <Button style="bordered" onClick={() => {
                        navigate("/singin")
                    }} >Sing in</Button>
                    <Button onClick={() => {
                        navigate("/singup")
                    }}>Sing up</Button>
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