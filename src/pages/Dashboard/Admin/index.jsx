import DashboardLayout from '../../../components/DashboardLayout';
import Profile from '../../../components/Profile';
import items  from './adminNavItems.json';
import CreateCommunityAdmin from './CreateCommunityAdmin';
import CreateCourse from './CreateCourse';
import CreateInstitute from './CreateInstitute';
import CreateInstituteAdmin from './CreateInstituteAdmin';
const AdminDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="Admin">
      <CreateCommunityAdmin />
      <CreateCourse />
      <CreateInstitute />
      <CreateInstituteAdmin />
    </DashboardLayout>
  );
};

export default AdminDashboard;