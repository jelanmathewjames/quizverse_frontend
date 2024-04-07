import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import departmentsData from "../Faculty/dummy_data/departments.json";
import moduleData from "../Faculty/dummy_data/module.json";
import semestersData from "../Faculty/dummy_data/semesters.json";
import subjectsData from "../Faculty/dummy_data/subjects.json";
import ModuleQuestionReader from "./moduleQuestionReader";

const CreateQubank = () => {
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questionData, setQuestionData] = useState(null);
  const [questionType, setQuestionType] = useState("mcq");
  const modules = moduleData;
  console.log(modules);

  const [loading, setLoading] = useState(false);

  // fetch data from the server using dummy data
  useEffect(() => {
    setSemesters(semestersData);
    setDepartments(departmentsData);
    setSubjects(subjectsData);
  }, []);
  const handleQuestionData = (data) => {
    setQuestionData(data);
  };
  //fetch data from server by api calls
  //-------------------------------------------
  //  useEffect(() => {
  //     const fetchDepartments = async () => {
  //       try {
  //         const response = await axios.get('/api/departments');
  //         setDepartments(response.data);
  //       } catch (error) {
  //         console.error('Failed to fetch departments:', error);
  //       }
  //     };
  //     fetchDepartments();
  //  }, []);
  //
  // useEffect(() => {
  //     const fetchSubjects = async () => {
  //         try {
  //             const response = await axios.get('/api/subjects', {
  //                 params: {
  //                     semester: selectedSemester,
  //                     department: selectedDepartment
  //                 }
  //             });
  //             setSubjects(response.data);
  //         } catch (error) {
  //             console.error('Failed to fetch subjects:', error);
  //         }
  //     };
  //     fetchSubjects();
  // }, [selectedSemester, selectedDepartment]);
  //   useEffect(() => {
  //     const fetchModules = async () => {
  //         try {
  //             const response = await axios.get('/api/modules', {
  //                 params: {
  //                     semester: selectedSemester,
  //                     department: selectedDepartment,
  //                     subject: selectedSubject
  //                 }
  //             });
  //             // Process the response and update the state with the fetched modules
  //         } catch (error) {
  //             console.error('Failed to fetch modules:', error);
  //         }
  //     };
  //     fetchModules();
  // }, [selectedSemester, selectedDepartment, selectedSubject]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const startQz = async () => {
    console.log(selectedDepartment, selectedSemester, selectedSubject);
    if (!selectedDepartment || !selectedSemester || !selectedSubject) {
      toast.error("Please fill all the details");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/startQuiz", {
        departmentId: selectedDepartment,
        semesterId: selectedSemester,
      });
      toast.success("Quiz started successfully");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to start quiz");
      console.error("Failed to start quiz", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center m-5">
        <div className="flex justify-center bg-base-100 w-full p-5 pb-10 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-auto   pt-12">
            <select
              className="select select-bordered w-[400px] sm:w-[300px] md:w-[500px] max-w-xs"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option disabled value="">
                Select Department
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-[400px] sm:w-[300px] md:w-[500px]  max-w-xs"
              value={selectedSemester}
              onChange={handleSemesterChange}
            >
              <option disabled value="">
                Select Semester
              </option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.name}>
                  {semester.name}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-[400px] sm:w-[300px] md:w-[500px] max-w-xs"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option disabled value="">
                Select Subject
              </option>
              {selectedSemester &&
                selectedDepartment &&
                subjects &&
                subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      {selectedDepartment && selectedSemester && selectedSubject && (
        <div>
            {
            console.log("inside the modules")

            }
          {modules
            .filter((module) => module.course_id == selectedSubject)
            .map((module, index) => (
              <ModuleQuestionReader
                key={index} // It's important to provide a unique key for each child in a list
                moduleName={module.module_name}
                moduleNumber={module.module_num}
                moduleId={module.module_id}
                onQuestionData={handleQuestionData}
                questionType={questionType}
              />
            ))
            
            }

          {/* <div className="flex justify-center p-">
                <button className="btn btn-outline btn-active mt-3" onClick={startQz}>
                  {loading ? (
                    <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
                  ) : (
                    "Create QuestionBank"
                  )}
                </button>
        
              </div> */}
        </div>
      )}
    </>
  );
};

export default CreateQubank;
