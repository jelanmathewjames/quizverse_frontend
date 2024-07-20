import DashboardLayout from '../../../components/DashboardLayout'
import AssignCourses from './AssignCourses'
import GiveRoles from './GiveRoles'
import items from './InstituteNavItems.json'
import LinkDepartmentCourse from './LinkDepartmentCourse'
const InstitutionDashboard = () => {
    return (
        <DashboardLayout navitems={items} title="InstitutionAdmin">
            <GiveRoles />
            <LinkDepartmentCourse />
            <AssignCourses />
        </DashboardLayout>
    )
}

export default InstitutionDashboard
