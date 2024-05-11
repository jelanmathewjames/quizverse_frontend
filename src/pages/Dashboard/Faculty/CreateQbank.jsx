import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { axiosPrivate } from "../../../config/axiosInstance";
import departmentsData from "../Faculty/dummy_data/departments.json";
import moduleData from "../Faculty/dummy_data/module.json";
import semestersData from "../Faculty/dummy_data/semesters.json";
import subjectsData from "../Faculty/dummy_data/subjects.json";
import { containerVariants } from "./../../../helpers/animationHelpers/containerVariants";
import ModuleQuestionReader from "./ModuleQuestionReader";

const CreateQubank = () => {
  const [subjects, setSubjects] = useState("");
  const [modules, setModules] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [questionData, setQuestionData] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseList, setCourseList] = useState([]);

  // const modules = moduleData.filter((module) => module.course_id == selectedSubject);
  const [loading, setLoading] = useState(false);

  const handleQuestionData = (moduleId, data) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [moduleId]: {
        ...prevData[moduleId],
        ...data,
      },
    }));
    console.log(questionData);
  };

  //fetch course from server
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosPrivate.get("/admin/course");
        setCourseList(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourse();
  }, []);

  // //fetch modules from server
  //   useEffect(() => {
  //     const fetchModules = async () => {
  //         try {
  //             const response = await axios.get('/api/modules', {
  //               id: selectedSubject
  //             });
  //             setModules(response.data);
  //         } catch (error) {
  //             console.error('Failed to fetch modules:', error);
  //         }
  //     };
  //     fetchModules();
  // }, [selectedSubject]);

  const CreateQBank = async () => {
    //   if (Object.keys(questionData).length !== modules.length)
    //   { toast.error("Please complete all module questions");
    //     return;
    //  }
    //   try {
    //     setLoading(true);
    //       const response = await axios.post("/api/createQbank", {
    //         department: selectedDepartment,
    //         semester: selectedSemester,
    //         subject: selectedSubject,
    //         questions: questionData,
    //       });
    //       toast.success("QuizBank created successfully");
    //       console.log(response.data);
    //   } catch (error) {
    //     toast.error("Failed to Create QuizBank");
    //   } finally {
    //     setLoading(false);
    //   }
  };

  const CreateQuestionBank = async () => {
    if (!title || !selectedCourse) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosPrivate.post("/faculty/questionbank", {
        title: title,
        course_id: selectedCourse,
      });
      toast.success("QuestionBank created successfully");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to Create QuestionBank");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* div for input:title,coures,quizBankCreatebtn */}
     
      <motion.div
        className="flex flex-col gap-3  items-center md:items-start w-full "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
       <h1 className="text-2xl font-bold pb-5">Create QuizBank</h1>
      <div className="inputwrapper flex flex-col items-center md:flex-row gap-3 w-full lg:w-1/2">
        {/* input: quiz title */}
        <input
          type="text"
          placeholder="Type Quiz Title.."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input input-bordered w-[80%] md:w-[60%] "
        />
        {/* fetch course using api  */}
        <select
          className="select select-bordered   w-[80%] md:w-[60%]"
          value={selectedCourse}
          onChange={(event) => setSelectedCourse(event.target.value)}
        >
          <option disabled value="">
            Select Course
          </option>
          {courseList.length != 0 ? (
            courseList.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} {course.code}
              </option>
            ))
          ) : (
            <option disabled value="">
              No Course Found
            </option>
          )}
        </select>
      </div>
        
          

        <button
          className="btn btn-outline btn-active mt-3 w-[80%] md:max-w-xs"
          onClick={CreateQuestionBank}
        >
          {loading ? (
            <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
          ) : (
            "Create QuestionBank"
          )}

        </button>
      </motion.div>
      {/* ------------------------------------------- */}
      <div className="col-span-2 h-80 bg-gray-500">Child 2</div>
      {/* {selectedSubject && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {console.log("inside the modules")}
          {modules
            .filter((module) => module.course_id == selectedSubject)
            .map((module, index) => (
              <ModuleQuestionReader
                key={index} // It's important to provide a unique key for each child in a list
                moduleName={module.module_name}
                moduleNumber={module.module_num}
                moduleId={module.module_id}
                onQuestionData={(data) =>
                  handleQuestionData(module.module_id, data)
                }
                questionType={"mcq"}
              />
            ))}
          {modules.length === 0 ? (
            <div className="flex justify-center p-5">No modules found</div>
          ) : (
            <div className="flex justify-center p-">
              <button
                className="btn btn-outline btn-active mt-3"
                onClick={CreateQBank}
              >
                {loading ? (
                  <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
                ) : (
                  "Create QuestionBank"
                )}
              </button>
            </div>
          )}
        </motion.div>
      )} */}
    </div>
  );
};

export default CreateQubank;
