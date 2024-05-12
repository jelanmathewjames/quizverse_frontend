import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { containerVariants } from "./../../../helpers/animationHelpers/containerVariants";
import ModuleQuestionReadWrite from "./ModuleQuestionReadWrite";

const CreateQubank = () => {
  const axiosPrivate = useAxiosPrivate();
  const [modules, setModules] = useState([]);
  const [quizId, setQuziId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState();
  // store quizId in local storage
  const [title, setTitle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseList, setCourseList] = useState([]);

  const { setItem: setQuizIdInLocalStorage } = useLocalStorage("quizId");
  const { setItem: setCourseInLocalStorage } = useLocalStorage("courseId");

  const [loading, setLoading] = useState(false);
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



  const CreateQuestionBank = async () => {
    if (!title || !selectedCourse) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosPrivate.post("/quiz/qbank/", {
        title: title,
        course_id: selectedCourse,
      });
      toast.success("QuestionBank created successfully");
      setQuziId(response.data.id); // store quizId in state
      console.log("selectedCourse", selectedCourse);
      setSelectedCourseId(selectedCourse); // store courseId in state
      setQuizIdInLocalStorage(response.data.id); // store quizId in local storage , quizId as key
      setCourseInLocalStorage(selectedCourse); // store courseId in local storage ,courseId as key
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      // setSelectedCourse("");
      setTitle("");
      setLoading(false);
    }
  };

  // fetch modules from server based on the selected course
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axiosPrivate.get(
          "/admin/module?id=" + selectedCourseId
        );
        setModules(response.data);
        console.log("modules", modules);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };
    if (selectedCourseId) {
      fetchModules();
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (quizId) {
      console.log("currentQuiz id : " + quizId);
    }
  }, [quizId]);

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
      {/* module wise question read and write to the backend */}
      {quizId && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {modules.length != 0 ? (
            modules.map((module, index) => (
              <ModuleQuestionReadWrite
                key={index} // It's important to provide a unique key for each child in a list
                module_name={module.module_name}
                module_number={module.module_number}
                module_id={module.id}
                quiz_id={quizId}
                question_number= {index*10} 
                
              />
            ))
          ) : (
            <div className="flex justify-center p-5">No modules found</div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CreateQubank;
