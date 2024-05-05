import { Route, Routes } from "react-router-dom"

import PersistenLogin from "./components/PersistLogin"
import CheckAuth from "./components/CheckAuth"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/Dashboard/Admin"
import CommunityDashboard from "./pages/Dashboard/CommunityAdmin"
import FacultyDashboard from "./pages/Dashboard/Faculty"
import InstitutionAdmin from "./pages/Dashboard/InstitutionAdmin"
import StudentDashboard from "./pages/Dashboard/Student"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Resetpassword from "./pages/Resetpassword"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Unauthorized from "./pages/Unauthorized"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/signup" element={<Signup/>}> </Route>
      <Route path="/signin" element={<Signin/>}> </Route>
      <Route path="/unauthorized" element={<Unauthorized/>}></Route>
      
      <Route element={<PersistenLogin/>}>
        <Route element={<CheckAuth allowedRoles={[]} />}>
          <Route path="/resetpassword" element={<Resetpassword/>}> </Route>
          <Route path="/dashboard" element={<Dashboard/>}> </Route>
        </Route>
        <Route element={<CheckAuth allowedRoles={["Faculty"]} />}>
          <Route path="/faculty/*" element={<FacultyDashboard/>}> </Route>
        </Route>
        <Route element={<CheckAuth allowedRoles={["Institute"]} />}>
          <Route path="/institute/*" element={<InstitutionAdmin/>}> </Route>
        </Route>
        <Route element={<CheckAuth allowedRoles={["Student"]} />}>
          <Route path="/student/*" element={<StudentDashboard/>}> </Route>
        </Route>
        <Route element={<CheckAuth allowedRoles={["Admin"]} />}>
          <Route path="/admin/*" element={<AdminDashboard/>}> </Route>
        </Route>  
        <Route element={<CheckAuth allowedRoles={["Community"]} />}>
          <Route path="/community/*" element={<CommunityDashboard/>}> </Route>
        </Route>
          <Route path="*" element={<NotFound/>}> </Route>
      </Route>
    </Routes>
  )
}

export default App
