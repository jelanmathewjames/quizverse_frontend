import { motion } from 'framer-motion'
import { GrFormNextLink } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

import DashboardLayout from '../components/DashboardLayout'
import Profile from '../components/Profile'
import { containerVariants } from '../helpers/animationHelpers/containerVariants'
import useAuth from '../hooks/useAuth'
import items from './dashboardItems.json'

const Dashboard = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()

    const moveToDashBoard = (role) => {
        if (role == 'Admin') {
            navigate('/admin')
        } else if (role == 'Institution') {
            navigate('/institute')
        } else if (role == 'Community') {
            navigate('/community')
        } else if (role == 'Faculty') {
            navigate('/faculty')
        } else if (role == 'Student') {
            navigate('/student')
        } else if (role == 'CommunityMember') {
            navigate('/communitymember')
        }
    }

    return (
        <DashboardLayout navitems={items} title="Dashboard">
            <motion.div
                className="flex justify-center items-center flex-col  gap-2 m-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {auth?.role.length > 0 ? (
                    auth?.role.map((role, i) => (
                        <motion.button
                            key={i}
                            onClick={() => moveToDashBoard(role)}
                            className="flex justify-between items-center bg-base-200 hover:bg-base-200 font-bold py-2 w-4/5 rounded-lg shadow-md transition-all duration-500 ease-in-out"
                            whileHover={{ scale: 0.97, opacity: 1.0 }}
                        >
                            <span className="flex-1 text-center">{role}</span>
                            <span className="mx-4">
                                <GrFormNextLink size={25} />
                            </span>
                        </motion.button>
                    ))
                ) : (
                    <motion.button className="flex justify-center items-center bg-base-200 hover:bg-base-200 font-bold py-2 w-4/5 rounded-lg shadow-md transition-all duration-500 ease-in-out cursor-default">
                        user has no specific dashboards
                    </motion.button>
                )}
            </motion.div>
            <Profile />
            <Notification />
        </DashboardLayout>
    )
}

export default Dashboard
