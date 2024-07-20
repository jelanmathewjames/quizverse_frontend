import DashboardLayout from '../../../components/DashboardLayout'
import items from './adminNavItems.json'
import CreateCommunity from './CreateCommunity'
import CreateCourseAndDepartment from './CreateCourseAndDepartment'
import CreateInstitute from './CreateInstitute'
import GiveRole from './GiveRole'
const AdminDashboard = () => {
    return (
        <DashboardLayout navitems={items} title="Admin">
            <GiveRole />
            <CreateInstitute />
            <CreateCommunity />
            <CreateCourseAndDepartment />
        </DashboardLayout>
    )
}

export default AdminDashboard
