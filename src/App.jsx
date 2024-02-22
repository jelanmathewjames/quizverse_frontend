import { Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Resetpassword from "./pages/Resetpassword"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/signup" element={<Signup/>}> </Route>
      <Route path="/signin" element={<Signin/>}> </Route>
      <Route path="/dashboard" element={<Dashboard/>}> </Route>
      <Route path="/resetpassword" element={<Resetpassword/>}> </Route>
      <Route path="*" element={<NotFound/>}> </Route>

    </Routes>
  )
}

export default App
