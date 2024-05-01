import DashboardLayout from '../../../components/DashboardLayout';
import AddCourse from './AddCourse';
import AddFaculty from './AddFaculty';
import items from './InstituteNavItems.json';
const InstitutionDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="InstitutionAdmin">
        <AddCourse/>
        <AddFaculty/>
    </DashboardLayout>
  );
};

export default InstitutionDashboard;