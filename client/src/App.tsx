import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Pomodoro from './pages/Pomodoro'
import Presets from './pages/Presets'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducersType } from './redux/reducers'
import { SET_PRESETS, SET_USER_DATA } from './redux/types'


function App() {
  const state = useSelector((state:ReducersType) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    if(state?.user?.tkn){
      const tokenData = JSON.parse(atob(state.user.tkn.split('.')[1]));
      console.log(tokenData)
      const expDate = new Date(0)
      expDate.setUTCSeconds(tokenData.exp)
      const date = new Date()
      if (expDate.getTime() > date.getTime()){
        console.log("valid token")
        console.log("you have " + (expDate.getHours() - date.getHours() + " hours"))
      }else {
        dispatch({
          type: SET_USER_DATA,
          payload: {
            username: null,
            tkn: null
          }
        })
        dispatch({
          type:SET_PRESETS,
          payload: []
        })
      }
    }
  },[state.user])

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/singin' element={<Auth mode='singIn'/>}/> 
          <Route path='/singup' element={<Auth mode="singUp"/>}/>
          <Route path='/pomodoro' element={
            <Header>
              <Outlet/>
            </Header>
          } >
            <Route index element={<Pomodoro/>}/>
            <Route path='presets' element={<Presets/>}/> 
          </Route>
          <Route path='*' element={<Navigate to="/pomodoro"/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
