import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Import Router components
import Landing from './Pages/Landing' // Import Landing component
import Login from './Pages/Login' // Import Login component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Route for Landing */}
        <Route path="/login" element={<Login />} /> {/* Route for Login */}
      </Routes>
    </Router>
  )
}

export default App