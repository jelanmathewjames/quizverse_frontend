import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/signup" element={<Signup/>}> </Route>
      <Route path="/dashboard" element={<Dashboard/>}> </Route>
    </Routes>
  )
}

export default App
