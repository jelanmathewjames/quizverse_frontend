import DashboardLayout from '../../../components/DashboardLayout';
import Profile from '../../../components/Profile';
import items  from './adminNavItems.json';
import CreateCommunity from './CreateCommunity';
import CreateCommunityAdmin from './CreateCommunityAdmin';
import CreateCourse from './CreateCourse';
import CreateInstitute from './CreateInstitute';
import CreateInstituteAdmin from './CreateInstituteAdmin';
import GiveRole from './GiveRole';
const AdminDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="Admin">
      <GiveRole />
      <CreateInstitute />
      <CreateCommunity/>
      <CreateCourse />
    </DashboardLayout>
  );
};

export default AdminDashboard;