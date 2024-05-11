import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

import departmentsData from "../Faculty/dummy_data/departments.json";
import questionBanksData from "../Faculty/dummy_data/qBanks.json";
import semestersData from "../Faculty/dummy_data/semesters.json";
import studentsData from "../Faculty/dummy_data/students.json";
import subjectsData from "../Faculty/dummy_data/subjects.json";
import { containerVariants } from "./../../../helpers/animationHelpers/containerVariants";

const StartQuiz = () => {
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState("");
  const [questionBanks, setQuestionBanks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedQuestionBank, setSelectedQuestionBank] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClickOutside = (event) => {
    if (popupRef.current) {
      if (
        !popupRef.current.contains(event.target) &&
        event.target !== popupRef.current
      ) {
        setShowPopup(false);
      }
    }
  };

  useEffect(() => {
    setSemesters(semestersData);
    setDepartments(departmentsData);
    setSubjects(subjectsData);
    setQuestionBanks(questionBanksData);
    setStudents(studentsData);
  }, []);

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
  // useEffect(() => {
  //     const fetchStudents = async () => {
  //         try {
  //             const response = await axios.get('/api/students', {
  //                 params: {
  //                     departmentId: selectedDepartment,
  //                     semesterId: selectedSemester
  //                 }
  //             });
  //             setStudents(response.data);
  //         } catch (error) {
  //             console.error('Failed to fetch students:', error);
  //         }
  //     };
  //     fetchStudents();
  // }, [selectedDepartment, selectedSemester]);
  // useEffect(() => {
  //     const fetchQuestionBanks = async () => {
  //         try {
  //             const response = await axios.get('/api/questionBanks', {
  //                 params: {
  //                     courseId: selectedSubject
  //                 }
  //             });
  //             setQuestionBanks(response.data);
  //         } catch (error) {
  //             console.error('Failed to fetch question banks:', error);
  //         }
  //     };
  //     fetchQuestionBanks();
  // }, [selectedSubject]);

  // fetch data from the server using dummy data

  const selectAllStudents = () => {
    const allStudentIds = students.map((student) => student.id);
    setSelectedStudents(allStudentIds);
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleQuestionBankChange = (event) => {
    setSelectedQuestionBank(event.target.value);
    console.log(selectedQuestionBank);
  };

  const startQz = async () => {
    console.log(
      selectedDepartment,
      selectedSemester,
      selectedSubject,
      selectedQuestionBank,
      selectedStudents
    );
    if (
      !selectedDepartment ||
      !selectedSemester ||
      !selectedSubject ||
      !selectedQuestionBank ||
      selectedStudents.length === 0
    ) {
      toast.error("Please fill all the details");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/startQuiz", {
        questionBankId: selectedQuestionBank,
        studentIds: selectedStudents,
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
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <motion.div className="flex justify-center flex-col m-2 "initial="hidden"
    animate="visible"
    variants={containerVariants}>
      <div className="flex flex-col items-center lg:items-start gap-3 w-full md:w-1/2">
      <h1 className="text-2xl font-bold">Start Quiz</h1>

        {/* <select
          className="select select-bordered w-[400px] sm:w-[200px] md:w-[500px] max-w-xs"
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
        </select> */}
        {/* <select
          className="select select-bordered w-[400px] sm:w-[200px] md:w-[500px]  max-w-xs"
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
        </select> */}
        <select
          className="select select-bordered w-full sm:w-[80%]"
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
        <select
          className="select select-bordered  w-full sm:w-[80%]"
          value={selectedQuestionBank}
          onChange={handleQuestionBankChange}
        >
          <option disabled value="">
            Select Qbank
          </option>
          {selectedSubject &&
            questionBanks
              .filter((qBank) => qBank.subjectId == selectedSubject)
              .map((qBank) => (
                <option key={qBank.id} value={qBank.id}>
                  {qBank.title}
                </option>
              ))}
        </select>
        <select
          className="select select-bordered  w-full sm:w-[80%]"
          onClick={(e) => {
            if (e.target.value === "custom") {
              setShowPopup(true);
            } else if (e.target.value === "selectAll") {
              selectAllStudents();
            }
          }}
        >
          <option value="">Select students</option>
          {selectedDepartment && selectedSemester && 
            <>
                <option value="selectAll">Select All Students</option>
                <option value="custom">Custom Selection </option>
            </> 
            }
          
        </select>

        <div>
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-all ease-in-out delay-75 ">
              <div className="fixed  inset-0 flex items-center justify-center z-10">
                <div
                  ref={popupRef}
                  className=" z-20 m-10 w-80 lg:w-[600px] h-96 rounded-lg shadow-2xl bg-base-300 ring-1 ring-black ring-opacity-5 overflow-y-auto transition-all duration-300 ease-in-out transform scale-100 "
                  style={{ maxHeight: "80vh" }}
                >
                  <div
                    className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-4"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {students.map((student) => (
                      <div className="flex items-center" key={student.id}>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelection(student.id)}
                        />
                        <span
                          className="cursor-pointer w-5 h-5 inline-block rounded-md border border-gray-300 bg-white checked:bg-blue-600 checked:border-transparent focus:outline-none"
                          onClick={() => handleStudentSelection(student.id)}
                        >
                          {selectedStudents.includes(student.id) && (
                            <span className="w-full h-full inline-block rounded-md tick-animation">
                              <TiTick className=" text-black " />
                            </span>
                          )}
                        </span>
                        <span
                          className="ml-2 p-1 rounded-lg hover:bg-base-100 cursor-pointer"
                          onClick={() => handleStudentSelection(student.id)}
                        >
                          {student.roll_number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


    
        <button className="btn btn-outline btn-active mt-3  w-full sm:w-[80%]" onClick={startQz}>
          {loading ? (
            <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
          ) : (
            "Start Quiz"
          )}
        </button>
    
      </div>


  
      

    </motion.div>
      

    

    </>
  );
};

export default StartQuiz;
