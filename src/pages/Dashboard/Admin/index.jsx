import DashboardLayout from '../../../components/DashboardLayout';
import AddCommunityAdmin from './AddCommunityAdmin';
import AddInstituteAdmin from './AddInstituteAdmin';
import items from './adminNavItems.json';

const AdminDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="Admin">
        <AddCommunityAdmin/>
        <AddInstituteAdmin/>
    </DashboardLayout>
  );
};

export default AdminDashboard;