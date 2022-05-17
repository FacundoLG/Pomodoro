import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Pomodoro from './pages/Pomodoro'
import Presets from './pages/Presets'
import Auth from './pages/Auth'

function App() {

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
