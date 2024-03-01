import DashboardLayout from '../../../components/DashboardLayout';
import items from './adminNavItems.json';

const AdminDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="Admin">
        <>
        
        </>
      {/* Other specific content for the faculty dashboard */}
      <div>
        <h1>Welcome to the admin Dashboard</h1>
        {/* Other components or features specific to the Faculty Dashboard */}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;