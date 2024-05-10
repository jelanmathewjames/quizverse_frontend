import DashboardLayout from '../../../components/DashboardLayout';
import GiveRoles from './GiveRoles';
import items from './InstituteNavItems.json';
import LinkDepartmentCourse from './LinkDepartmentCourse';
const InstitutionDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="InstitutionAdmin">
        <GiveRoles/>
        <LinkDepartmentCourse/>
    </DashboardLayout>
  );
};

export default InstitutionDashboard;