import { FC, FormEvent, useEffect, useState } from "react"
import Button from "../components/Button"
import styles from "./sing.module.css"
import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"

type Auth = {
    mode: "singIn" | "singUp"
}

const Auth:FC<Auth> = ({mode}) => {
  const [isActive, setIsActive] = useState<Boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [confirmationPassword, setConfirmationPassword] = useState<string>("")
  const {data,error,loading,Exec} = useFetch({
    url: import.meta.env["VITE_SERVER_URL"] + "users/login",
    method: "POST",
  })
  const AuthenticateUser = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let Form = new FormData()
    Form.append("username",username)
    Form.append("password",password)
    console.log()
    Exec({
      body: Form
    })
  }
  useEffect(() => {
  },[data])
  return (
    <form className={styles.form}  onSubmit={(e) => {AuthenticateUser(e)}}>
      <h1 className={styles.form_title}>Pomodoro</h1>
      <div className={styles.input_container}>
        <label htmlFor="">username</label>
        <input type="text"
         value={username}
         onChange={(e) => {setUsername(e.target.value)}}
         />
        {
          mode=="singUp" &&
          <>
          <label htmlFor="">email</label>
          <input type="text" />
          </>
        }
        <label htmlFor="">password</label>
        <input type="password" 
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        />
        {
          mode =="singUp" &&
          <>
            <label htmlFor="">password</label>
            <input type="password"/> 
          </>
        }
      </div>
      <p className={styles.error}>{data?.detail.error || " "}</p>
      {
        mode == "singUp" ?
        <>
          <Button>Sing up</Button>
          <p>Already have an account? <Link to={"/singin"} className={styles.link}>singin</Link></p> 
        </>
        :
        <>
          <Button> Sing in </Button>
          <p>Don't have an account yet? <Link to={"/singup"} className={styles.link}>singup</Link></p>
        </>
      }
    </form>
  )
}

export default Auth