
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { axiosPrivate } from "../../../config/axiosInstance";

const AssignCourses = () => {
  const [courseList, setCourseList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [loading, setLoading] = useState(false);
  // fetch linked courses
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axiosPrivate.get("/admin/course?status=linked");
      setCourseList(response.data);
    };
    fetchCourses();
  }, []);
  // fetch faculty_ids
  useEffect(() => {
    const fetchFaculties = async () => {
      const response = await axiosPrivate.get("/admin/faculty");
      setFacultyList(response.data);
    };
    fetchFaculties();
  }, []);

  const assignCourse = async () => {
    if (selectedCourse && selectedFaculty) {
      try {
        setLoading(true);
        const response = await axiosPrivate.post("/admin/link/faculty-course/", {
          course_id: selectedCourse,
          faculty_id: selectedFaculty,
        });
        toast.success(response.data.message);
        setSelectedCourse("");
        setSelectedFaculty("");
      } catch (error) {
        toast.error(error.response.data.message);   
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select a course and faculty");
    }
  };

  return (
    <>
      <div
        className="flex justify-center flex-col m-2 "
        
      >
        <div className="flex flex-col items-center lg:items-start gap-3 w-full md:w-1/2">
          <h1 className="text-2xl font-bold">Assign Course</h1>

          <select
            className="select select-bordered w-full sm:w-[80%]"
            value={selectedFaculty}
            onChange={(event) => setSelectedFaculty(event.target.value)}
          >
            <option disabled value="">
              Select Faculty Id ...
            </option>
            {facultyList &&
              facultyList.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.faculty_id}
                </option>
              ))}
          </select>

          <select
            className="select select-bordered  w-full sm:w-[80%]"
            value={selectedCourse}
            onChange={(event) => setSelectedCourse(event.target.value)}
          >
            <option disabled value="">
              Select Course...
            </option>
            {courseList &&
              courseList.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} {course.code}
                </option>
              ))}
          </select>

          <button
            className="btn btn-outline btn-active mt-3  w-full sm:w-[80%]"
            onClick={assignCourse}
          >
            {loading ? (
              <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
            ) : (
              "Assign Course"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignCourses;
