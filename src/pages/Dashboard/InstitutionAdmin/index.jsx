import DashboardLayout from '../../../components/DashboardLayout';
import items from './InstituteNavItems.json';

const InstitutionDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="InstitutionAdmin">
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

export default InstitutionDashboard;