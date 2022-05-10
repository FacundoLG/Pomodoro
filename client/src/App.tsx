import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Pomodoro from './pages/Pomodoro'
import Presets from './pages/Presets'

function App() {

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='pomodoro' element={
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
