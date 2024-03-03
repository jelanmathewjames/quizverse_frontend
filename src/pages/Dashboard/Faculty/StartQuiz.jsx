import axios from 'axios';
import  { useEffect, useState } from 'react';

import departmentsData from './departments.json';
import questionBanksData from './questionBanks.json';
import studentsData from './students.json';
import subjectsData from './subjects.json';

const StartQuiz = () => {
 const [departments, setDepartments] = useState([]);
 const [subjects, setSubjects] = useState('');
 const [questionBanks, setQuestionBanks] = useState([]);
 const [students, setStudents] = useState([]);
 const [selectedDepartment, setSelectedDepartment] = useState('');
 const [selectedSemester, setSelectedSemester] = useState('');
 const [selectedDivision, setSelectedDivision] = useState('');
 const [selectedSubject, setSelectedSubject] = useState('');
 const [selectedQuestionBank, setSelectedQuestionBank] = useState('');
 const [selectedStudents, setSelectedStudents] = useState([]);
 const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

 useEffect(() => {
    const fetchData = async () => {
      try {
        setDepartments(departmentsData);
        setSubjects(subjectsData);
        setQuestionBanks(questionBanksData);
        setStudents(studentsData);
        // const response = await axios.get('/api/students');
        // setStudents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
 }, []);

 const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
 };

 const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
 };

 const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
 };

 const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
 };

 const handleQuestionBankChange = (event) => {
    setSelectedQuestionBank(event.target.value);
 };

 const handleStudentSelection = (event, studentId) => {
    if (event.target.checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
 };

 const startQuiz = () => {
    axios.post('/api/startQuiz', {
      questionBankId: selectedQuestionBank,
      studentIds: selectedStudents,
    }).then(response => {
      console.log('Quiz started successfully');
    }).catch(error => {
      console.error('Failed to start quiz', error);
    });
 };

return (
    <>
   
        <div className='flex gap-2 flex-wrap justify-center items-center pt-12'>
            <select className="select select-bordered w-full max-w-xs" value={selectedDepartment} onChange={handleDepartmentChange}>
                <option disabled selected value="">Select Department</option>
                {departments.map(department => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                ))}
            </select>
            <select className="select select-bordered w-full max-w-xs" value={selectedSemester} onChange={handleSemesterChange}>
                <option disabled selected value="">Select Semester</option>
                {semesters.map((semester, index) => (
                    <option key={index} value={semester}>{semester}</option>
                ))}
            </select>
            <select className="select select-bordered w-full max-w-xs" value={selectedDivision} onChange={handleDivisionChange}>
                <option disabled selected value=""> Select Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <select className="select select-bordered w-full max-w-xs" value={selectedSubject} onChange={handleSubjectChange}>
                <option disabled selected value="">Select Subject</option>
                {subjects && subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
            </select>
            <select className="select select-bordered w-full max-w-xs" value={selectedQuestionBank} onChange={handleQuestionBankChange}>
                <option disabled selected value="">Select Qbank</option>
                
                {
                    selectedSubject && (
                        (() => {
                            console.log('Selected subject:', selectedSubject);
                            console.log('Question banks:', questionBanks);
                            const filteredQuestionBanks = questionBanks.filter(qb => qb.subjectId == selectedSubject);
                            console.log('Filtered question banks:', filteredQuestionBanks); 
                            if (filteredQuestionBanks.length === 0) {
                                return <option value="">No question banks found</option>;
                            } else {
                                return filteredQuestionBanks[0].questionBanks.map(qb => (
                                    <option key={qb.id} value={qb.id}>
                                        {qb.name}
                                    </option>
                                ));
                            }
                        })()
                    )
                }
            </select>
            <select className="select select-bordered w-full max-w-xs" value={selectedDivision} onChange={handleDivisionChange}>
                <option disabled selected value=""> Select students</option>
                {console.log(students)}
                {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                ))}
            </select>

        </div>
        <div className=' flex justify-center p-'>
        <button className="btn btn-outline btn-active mt-3" onClick={startQuiz}>Start Quiz</button>

        </div>
       
       

        
    </>
);
};

export default StartQuiz;
