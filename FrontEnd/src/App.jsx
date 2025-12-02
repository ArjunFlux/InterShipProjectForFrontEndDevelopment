import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from '../Components/LoginPage'
import SignUpPage from '../Components/SignUpPage'
import HomePage from '../Components/HomePage'
import { ToastContainer } from 'react-toastify'
import CheckAuthentication from '../../BackEndWebdevelopment/Middleware/CheckAuthentication'
function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/' element={
            <CheckAuthentication>
            <HomePage/>
          </CheckAuthentication>}/>
      </Routes>
    </div>
  )
}
export default App
