import DashboardLayout from '../../../components/DashboardLayout';
import items from './facultyNavItems.json';

const FacultyDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="faculty">
        <>
        
        </>
      {/* Other specific content for the faculty dashboard */}
      <div>
        <h1>Welcome to the Faculty Dashboard</h1>
        {/* Other components or features specific to the Faculty Dashboard */}
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;