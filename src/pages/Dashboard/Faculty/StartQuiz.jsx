import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { containerVariants } from "./../../../helpers/animationHelpers/containerVariants";

const StartQuiz = () => {
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [qbankId, setQbankId] = useState("");
  const [qbankList, setQbankList] = useState("");
  const [studentsIds, setStudentsIds] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
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

  // fetch courses that available to faculty
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

  // fetch question banks that available to faculty
  useEffect(() => {
    const fetchQbanks = async () => {
      try {
        const response = await axiosPrivate.get("/quiz/qbank");
        setQbankList(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    fetchQbanks();
  }, []);
  // fetch students that rolled the course
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (courseId) {
          const response = await axiosPrivate.get(
            `/admin/student?course_id=${courseId}`
          );
          setStudentsList(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch question banks:", error);
      }
    };
    fetchStudents();
  }, [courseId]);

  // fetch data from the server using dummy data

  const selectAllStudents = () => {
    const allStudentIds = studentsList.map((student) => student.id);
    setStudentsIds(allStudentIds);
  };

  const handleStudentSelection = (studentId) => {
    setStudentsIds((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const startQz = async () => {
    if (!courseId || !qbankId || studentsIds.length === 0) {
      toast.error("Please fill all the details");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosPrivate.post("/quiz/viva/", {
        title: title,
        qbank_id: qbankId,
        course_id: courseId,
        student_id: studentsIds,
        duration: duration,
        start_time: startTime,
        end_time: endTime,
        viva_or_quiz:"VIVA"
      });
      toast.success("Quiz started successfully");
 
    } catch (error) {
      toast.error(error.response.data.message);
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
      <motion.div
        className="flex justify-center flex-col m-2 "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center lg:items-start gap-3 w-full md:w-1/2">
          <h1 className="text-2xl font-bold">Start Quiz</h1>
          {/* select coures */}
          <select
            className="select select-bordered   w-[80%] md:w-[60%]"
            value={courseId}
            onChange={(event) => setCourseId(event.target.value)}
          >
            <option disabled value="">
              Select Course...
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
          {/* select qbank */}
          <select
            className="select select-bordered   w-[80%] md:w-[60%]"
            value={qbankId}
            onChange={(event) => setQbankId(event.target.value)}
          >
            <option disabled value="">
              Select Qbank...
            </option>
            {qbankList.length != 0 ? (
              qbankList.map((qbank) => (
                <option key={qbank.id} value={qbank.id}>
                  {qbank.title}
                </option>
              ))
            ) : (
              <option disabled value="">
                No question banks Found
              </option>
            )}
          </select>
          <select
            className="select select-bordered w-[80%] md:w-[60%]"
            onClick={(e) => {
              if (e.target.value === "custom") {
                setShowPopup(true);
              } else if (e.target.value === "selectAll") {
                selectAllStudents();
              }
            }}
          >
            <option value="">Select students..</option>
            {studentsList.length != 0 ? (
              <>
                <option value="selectAll">Select All Students</option>
                <option value="custom">Custom Selection </option>
              </>
            ) : (
              <option disabled value="No Students Found">
                No Students Found
              </option>
            )}
          </select>
          <input
            type="text"
            placeholder="Type Quiz Title.."
            onChange={(event) => setTitle(event.target.value)}
            className="input input-bordered w-[80%] md:w-[60%] "
          />
          <label className="form-control w-[80%] md:w-[60%] ">
            <div className="label">
              <span className="label-text">Start Time </span>
            </div>
            <input
            type="datetime-local"
            placeholder="Type start time.."
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            className="input input-bordered w-full "
          />
          </label>

        
          <label className="form-control w-[80%] md:w-[60%] ">
            <div className="label">
              <span className="label-text">End Time </span>
            </div>
            <input
            type="datetime-local"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            className="input input-bordered w-full "
          />
          </label>


          <input
            type="number"
            placeholder="Type duration.."
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="input input-bordered w-[80%] md:w-[60%] "
          />

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
                      {studentsList.map((student) => (
                        <div className="flex items-center" key={student.id}>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={studentsIds.includes(student.id)}
                            onChange={() => handleStudentSelection(student.id)}
                          />
                          <span
                            className="cursor-pointer w-5 h-5 inline-block rounded-md border border-gray-300 bg-white checked:bg-blue-600 checked:border-transparent focus:outline-none"
                            onClick={() => handleStudentSelection(student.id)}
                          >
                            {studentsIds.includes(student.id) && (
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

          <button
            className="btn btn-outline btn-active mt-3 w-[80%] md:w-[60%]"
            onClick={startQz}
          >
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
