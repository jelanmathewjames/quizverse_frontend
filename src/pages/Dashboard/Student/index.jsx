import DashboardLayout from '../../../components/DashboardLayout';
import items from './studentNavItems.json';

const StudentDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="student">
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

export default StudentDashboard;