import { FC, FormEvent, useEffect, useState } from "react"
import Button from "../components/Button"
import styles from "./auth.module.css"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useDispatch } from "react-redux"
import { SET_USER_DATA } from "../redux/types"
import { UserState } from "../redux/reducers/user"

type Auth = {
    mode: "singIn" | "singUp"
}

const Auth:FC<Auth> = ({mode}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [usernameError,setUsernameError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordError,setPasswordError] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [emailError,setEmailError] = useState<string>("")
  const [confirmationPassword, setConfirmationPassword] = useState<string>("")
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {data,error,loading,Exec,Clean} = useFetch({
    url: import.meta.env["VITE_SERVER_URL"] + "users/" + (mode == "singIn"? "login" : "register"),
    method: "POST",
  })
  const AuthenticateUser = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let Form = new FormData()
    Form.append("username",username)
    Form.append("password",password)
    Exec({
      body: Form,
    })  
  }

  const CreateUser = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let Form = new FormData()
    Form.append("username",username)
    Form.append("password",password)
    Form.append("email",email)
    Form.append("confirmation_password",confirmationPassword)
    Exec({
      body: Form,
    })
  }

  /* Reset */
  useEffect(() => {
    setUsername("")
    setPassword("")
    setConfirmationPassword("")
    setEmail("")
    setUsernameError("")
    setEmailError("")
    setPasswordError("")
    Clean()
  },[mode])

  /* Input validation effect */
  useEffect(() => {
    if(loading) {
      setIsDisabled(true)
    }else{
      switch (mode) {
        case "singIn":
        if (username.length > 1 && password.length > 1) setIsDisabled(false)
        else setIsDisabled(true)
        return
        case "singUp":
          if (username.length >= 2 && password.length >= 9 && email.length > 1 && confirmationPassword == password) setIsDisabled(false)
          else setIsDisabled(true)
          return
        }
    }
  },[username,password,email,confirmationPassword,loading])
  
  
  /* data handler*/
  useEffect(() => {
    if (Array.isArray(data?.detail)){
      data?.detail?.map((err:{loc:string[], msg:string}) => {
        switch(err.loc[1]){
          case "email":
            return setEmailError(err.msg)
            case "username":
              return setUsernameError(err.msg)
              case "password":
                return setPasswordError(err.msg)
              }
            })
    }else{
      if(data?.detail?.email){
        setEmailError(data.detail.email)
      }
      if(data?.detail?.username){
        setUsernameError(data.detail.username)
      }
    }
    if(data?.data?.token){
     const tokenData = JSON.parse(atob(data.data.token.split(".")[1]))
     console.log(tokenData)

     const userData:UserState = {
       image_url: "",
       tkn: data.data.token,
       username: tokenData.username
     }
     dispatch({
       type: SET_USER_DATA,
       payload: userData
     })
     navigate("/pomodoro")
     localStorage.setItem("userData",JSON.stringify(userData))
    }
    if(data?.data?.message == "User created successfully"){
      navigate("/singin")
    }
  },[data])


  return (
    <form className={styles.form}  onSubmit={(e) => {
      mode == "singUp"?
      CreateUser(e)
      :
      AuthenticateUser(e)
    
    }}>
      <h1 className={styles.form_title}>Pomodoro</h1>
      <div className={styles.input_container}>
        <label htmlFor="">username</label>
        <input type="text"
         value={username}
         onChange={(e) => {setUsername(e.target.value)}}
         />
         <p className={styles.error}>{usernameError}</p>
        {
          mode=="singUp" &&
          <>
          <label htmlFor="">email</label>
          <input 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          type="text" />
          <p className={styles.error}>{emailError}</p>
          </>
        }
        <label htmlFor="">password <span>{"(grather than 8 characters)"}</span> </label>
        <input type="password" 
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        />
        <p className={styles.error}>{passwordError}</p>
        {
          mode =="singUp" &&
          <>
            <label htmlFor="">confirmation password</label>
            <input 
            type="password"
            value={confirmationPassword}
            onChange={(e) => {setConfirmationPassword(e.target.value)}}
            /> 
          </>
        }
      </div>
      <p className={styles.error}>{data?.detail?.error}</p>
      {
        mode == "singUp" ?
        <>
          <Button type="submit" disabled={isDisabled}>{isDisabled && loading ? "loading" : "Sing up" }</Button>
          <p>Already have an account? <Link to={"/singin"} className={styles.link}>singin</Link></p> 
        </>
        :
        <>
          <Button type="submit" disabled={isDisabled}>{isDisabled && loading ? "loading" : "Sing up" }</Button>
          <p>Don't have an account yet? <Link to={"/singup"} className={styles.link}>singup</Link></p>
        </>
      }
    </form>
  )
}

export default Auth