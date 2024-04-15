import DashboardLayout from '../../../components/DashboardLayout';
import AddCourse from './AddCourse';
import AddFaculty from './AddFaculty';
import items from './InstituteNavItems.json';
import LogOut from './LogOut';
const InstitutionDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="InstitutionAdmin">
        <AddCourse/>
        <AddFaculty/>
        <LogOut/>  
    </DashboardLayout>
  );
};

export default InstitutionDashboard;