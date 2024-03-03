import { Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import FacultyDashboard from "./pages/Dashboard/Faculty"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Resetpassword from "./pages/Resetpassword"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Unauthorized from "./pages/Unauthorized"
import CheckAuth from "./components/CheckAuth"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/signup" element={<Signup/>}> </Route>
      <Route path="/signin" element={<Signin/>}> </Route>
      <Route path="/unauthorized" element={<Unauthorized/>}></Route>
      
      <Route element={<CheckAuth allowedRoles={[]} />}>
        <Route path="/dashboard" element={<Dashboard/>}> </Route>
        <Route path="/resetpassword" element={<Resetpassword/>}> </Route>
        <Route path="/facultydashboard/*" element={<FacultyDashboard/>}> </Route>
        <Route path="*" element={<NotFound/>}> </Route>
      </Route>

    </Routes>
  )
}

export default App
