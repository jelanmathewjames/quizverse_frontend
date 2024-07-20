import { Route, Routes } from 'react-router-dom'

import CheckAuth from './components/CheckAuth'
import PersistenLogin from './components/PersistLogin'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/Dashboard/Admin'
import CommunityDashboard from './pages/Dashboard/CommunityAdmin'
import FacultyDashboard from './pages/Dashboard/Faculty'
import InstitutionAdmin from './pages/Dashboard/InstitutionAdmin'
import StudentDashboard from './pages/Dashboard/Student'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import QuizBoard from './pages/quiz/QuizBoard'
import Resetpassword from './pages/Resetpassword'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Unauthorized from './pages/Unauthorized'

function App() {
    return (
        <Routes>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>

            <Route element={<PersistenLogin />}>
                <Route path="/" element={<Home />}>
                    {' '}
                </Route>
                <Route
                    element={
                        <CheckAuth requireAuth={false} allowedRoles={[]} />
                    }
                >
                    <Route path="/signup" element={<Signup />}>
                        {' '}
                    </Route>
                    <Route path="/signin" element={<Signin />}>
                        {' '}
                    </Route>
                </Route>
                <Route
                    element={<CheckAuth requireAuth={true} allowedRoles={[]} />}
                >
                    <Route path="/dashboard" element={<Dashboard />}>
                        {' '}
                    </Route>
                    <Route path="/resetpassword" element={<Resetpassword />}>
                        {' '}
                    </Route>
                    <Route path="/quiz/*" element={<QuizBoard />}></Route>
                </Route>
                <Route
                    element={<CheckAuth requireAuth={true} allowedRoles={[]} />}
                >
                    <Route path="/faculty/*" element={<FacultyDashboard />}>
                        {' '}
                    </Route>
                </Route>
                <Route
                    element={
                        <CheckAuth
                            requireAuth={true}
                            allowedRoles={['Institution']}
                        />
                    }
                >
                    <Route path="/institute/*" element={<InstitutionAdmin />}>
                        {' '}
                    </Route>
                </Route>
                <Route
                    element={<CheckAuth requireAuth={true} allowedRoles={[]} />}
                >
                    <Route path="/student/*" element={<StudentDashboard />}>
                        {' '}
                    </Route>
                </Route>
                <Route
                    element={
                        <CheckAuth
                            requireAuth={true}
                            allowedRoles={['Admin']}
                        />
                    }
                >
                    <Route path="/admin/*" element={<AdminDashboard />}>
                        {' '}
                    </Route>
                </Route>
                <Route
                    element={
                        <CheckAuth
                            requireAuth={true}
                            allowedRoles={['Community']}
                        />
                    }
                >
                    <Route path="/community/*" element={<CommunityDashboard />}>
                        {' '}
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />}>
                    {' '}
                </Route>
            </Route>
        </Routes>
    )
}

export default App
