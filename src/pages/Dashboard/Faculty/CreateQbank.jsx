import axios from "axios";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import departmentsData from "../Faculty/dummy_data/departments.json";
import moduleData from "../Faculty/dummy_data/module.json";
import semestersData from "../Faculty/dummy_data/semesters.json";
import subjectsData from "../Faculty/dummy_data/subjects.json";
import { containerVariants } from "./../../../helpers/animationHelpers/containerVariants";
import ModuleQuestionReader from "./ModuleQuestionReader";

const CreateQubank = () => {
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questionData, setQuestionData] = useState([]);
 
  const modules = moduleData.filter((module) => module.course_id == selectedSubject);
  const [loading, setLoading] = useState(false);

  // fetch data from the server using dummy data
  useEffect(() => {
    setSemesters(semestersData);
    setDepartments(departmentsData);
    setSubjects(subjectsData);
  }, []);
  const handleQuestionData = (moduleId, data) => {
    setQuestionData(prevData => ({
       ...prevData,
       [moduleId]: {
         ...prevData[moduleId],
         ...data
       }
  }));
    console.log(questionData);
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

  const CreateQBank = async () => {
    
    if (Object.keys(questionData).length !== modules.length) 
    { toast.error("Please complete all module questions"); 
      return;
   }
    try {
      setLoading(true);
        const response = await axios.post("/api/createQbank", {
          department: selectedDepartment,
          semester: selectedSemester,
          subject: selectedSubject,
          questions: questionData,
        });
        toast.success("QuizBank created successfully");
        console.log(response.data);
    
      
    } catch (error) {
      toast.error("Failed to Create QuizBank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <motion.div className="flex justify-center m-5"  initial="hidden"
    animate="visible"
    variants={containerVariants}>
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
      </motion.div>
      {selectedDepartment && selectedSemester && selectedSubject && (
        <motion.div  variants={containerVariants}
        initial="hidden"
        animate="visible">
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
                onQuestionData={(data) => handleQuestionData(module.module_id, data)}
                questionType={'mcq'}
              />
            ))
            
            }
            {
              modules.length === 0 ? <div className="flex justify-center p-5">No modules found</div>
              : <div className="flex justify-center p-">
              <button className="btn btn-outline btn-active mt-3" onClick={CreateQBank}>
                {loading ? (
                  <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
                ) : (
                  "Create QuestionBank"
                )}
              </button>
      
            </div> 
            }
          
        </motion.div>
      )}
    
    </>
  );
};

export default CreateQubank;
