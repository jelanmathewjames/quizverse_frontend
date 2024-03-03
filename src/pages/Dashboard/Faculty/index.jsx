import DashboardLayout from '../../../components/DashboardLayout';
import CreateQbank from './CreateQbank';
import items from './facultyNavItems.json'; 
import Profile from './Profile';
import QuizHistory from './QuizHistory';
import StartQuiz from './StartQuiz';

const FacultyDashboard = () => {
  return (
    <DashboardLayout navitems={items} title="faculty">
        <StartQuiz/>
        <CreateQbank/>
        <QuizHistory/>
        <Profile/>
    </DashboardLayout>
  );
};

export default FacultyDashboard;           