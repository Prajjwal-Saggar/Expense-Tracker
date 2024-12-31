import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Import Router components
import Landing from './Pages/Landing' // Import Landing component
import Login from './Pages/Login' // Import Login component
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/DashBoard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/SignUp" element={<SignUp/>} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App