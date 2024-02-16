import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/signin"
import Resetpassword from "./pages/Resetpassword"
import NotFound from "./pages/NotFound"


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
