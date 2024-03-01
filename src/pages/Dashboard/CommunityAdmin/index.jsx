import DashboardLayout from '../../../components/DashboardLayout';
import items from './communityNavItems.json';

const CommunityDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="CommunityAdmin">
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

export default CommunityDashboard;