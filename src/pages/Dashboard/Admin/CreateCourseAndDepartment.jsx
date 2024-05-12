import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ModuleCreation from "./ModuleCreation";

const CreateCourseAndDepartment = () => {
  const axiosPrivate = useAxiosPrivate();
  const [departmentRead, setDepartmentRead] = useState("");
  const [departmenet, setDepartment] = useState("");
  const [departmentList, setDepartmentList] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [educationSystem, setEducationSystem] = useState("");
  const [class_or_semester, setClassOrSemester] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [courseId, setCourseId] = useState(""); // department id from response
  const [courseName, setCourseName] = useState(""); //course from response
  const [numberOfModules, setNumberOfModules] = useState(null);
  // read educationList data
  useEffect(() => {
    const fetchEducationSystem = async () => {
      try {
        const response = await axiosPrivate.get("/admin/education-system");
        setEducationSystem(response.data);
      } catch (error) {
        setEducationSystem([]);
      }
    };
    fetchEducationSystem();
  }, []);
  // read departmentList data
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axiosPrivate.get("/admin/department");
        setDepartmentList(response.data);
      } catch (error) {
        setDepartmentList([]);
      }
    };
    fetchDepartment();
  }, []);

  const createDepartment = async () => {
    if (departmentRead != "") {
      try {
        const response = await axiosPrivate.post("/admin/department/", {
          name: departmentRead,
        });
        toast.success("Department created successfully");
        setDepartmentRead("");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please enter a value");
    }
  };

  const handleDepartmentReadChange = (event) => {
    setDepartmentRead(event.target.value);
  };
  const handleEducationSelectChange = (event) => {
    setSelectedEducation(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleClassChange = (event) => {
    setClassOrSemester(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };
  const handleNumberOfModulesChange = (event) => {
    setNumberOfModules(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      createDepartment();
    }
  };

  const createCourse = async () => {
    if (
      name != "" &&
      code != "" &&
      departmenet != "" &&
      selectedEducation != "" &&
      class_or_semester != ""
    ) {
      try {
        const response = await axiosPrivate.post("/admin/course/", {
          name: name,
          code: code,
          department_id: departmenet,
          education_system_id: selectedEducation,
          class_or_semester: class_or_semester,
        });
        setCourseId(response.data.id);
        setCourseName(response.data.name);
        toast.success("Course created successfully");
        setName("");
        setCode("");
        setDepartment("");
        setSelectedEducation("");
        setClassOrSemester("");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please enter a value");
    }
  };

  return (
    <>
      {/* course and department */}
      <div className="md:grid md:grid-cols-2 flex flex-col-reverse gap-10 pt-5 pb-5">

        {/* div for course creattion */}
        <div className="flex flex-col gap-3   items-center">
          {/* course creation */}
          <h1 className="text-center mb-3"> Course creation </h1>
          <div className="course flex flex-col gap-3">
            {/* input: name */}
            <input
              type="text"
              placeholder="Type Course Name ..."
              className="input w-full mt- max-w-xs"
              value={name}
              onChange={handleNameChange}
            />
            {/* input: code */}
            <input
              type="text"
              placeholder="Type Course Code."
              className="input w-full mt- max-w-xs"
              value={code}
              onChange={handleCodeChange}
            />

            {/* input : class/semester */}
            <input
              type="number"
              placeholder="Type class or semester."
              className="input w-full mt- max-w-xs"
              value={class_or_semester}
              onChange={handleClassChange}
            />

            {/* select department from the department list */}
            <select
              className="select select-bordered  w-full mt- max-w-xs"
              value={departmenet}
              onChange={handleDepartmentChange}
            >
              <option disabled value="">
                Select Department..
              </option>
              {departmentList != "" &&
                departmentList.map((system) => (
                  <option key={system.id} value={system.id}>
                    {system.name}
                  </option>
                ))}
            </select>

            {/* select education system from the list  */}
            <select
              className="select select-bordered  w-full mt- max-w-xs"
              value={selectedEducation}
              onChange={handleEducationSelectChange}
            >
              <option disabled value="">
                Select education system type..
              </option>
              {educationSystem != "" &&
                educationSystem.map((system) => (
                  <option key={system.id} value={system.id}>
                    {system.name}
                  </option>
                ))}
            </select>

            <button
              className="btn btn-neutral w-80 mt-4 "
              onClick={createCourse}
            >
              Create Course
            </button>
          </div>
        </div>

        {/* departmenet creation */}
        <div className="department flex flex-col items-center">
          <h1 className="text-center mb-7"> Department creation </h1>
          <input
            type="text"
            id="education-system"
            placeholder="Type department name ..."
            className="input w-full mt- max-w-xs"
            value={departmentRead}
            onChange={handleDepartmentReadChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className="btn btn-neutral w-80 mt-4 "
            onClick={createDepartment}
          >
            Create department
          </button>
        </div>
      </div>

      {/* module creation */}
      <div>
        {courseId != "" ? (
          <div>
            <h1 className="text-center mt-3"> Module Creation </h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* courese-name */}
              <div>
                <h1 className="text-center  mt-3 "> Course : {courseName}</h1>
              </div>
              {courseId != "" ? (
                <div className="module ">
                  <input
                    type="number"
                    placeholder="Type the number of modules."
                    className="input w-full mt- max-w-xs"
                    value={numberOfModules}
                    onChange={handleNumberOfModulesChange}
                  />
                </div>
              ) : null}
            </div>
            {numberOfModules !== null && (
          <div>
            {Array.from({ length: numberOfModules }, (_, index) => (
              <ModuleCreation
                module_num={index + 1}
                course_id={courseId}
                key={index}
              />
            ))}
          </div>
        )}
          </div>
        ) : null}
      
      </div>
    </>
  );
};

export default CreateCourseAndDepartment;
