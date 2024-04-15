import DashboardLayout from '../../../components/DashboardLayout';
import Profile from './Profile';
import QuizResult from './QuizResult';
import items from './studentNavItems.json';
import TakeQuiz from './TakeQuiz';


const StudentDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="student">
      <TakeQuiz/>
      <QuizResult />
      <Profile />
    </DashboardLayout>
  );
};

export default StudentDashboard;