import DashboardLayout from '../../../components/DashboardLayout'
import items from './studentNavItems.json'
import TakeQuiz from './TakeQuiz'
import ViewResults from './ViewResults'

const StudentDashboard = () => {
    return (
        <DashboardLayout navitems={items} title="student">
            <TakeQuiz />
            <ViewResults />
        </DashboardLayout>
    )
}

export default StudentDashboard
