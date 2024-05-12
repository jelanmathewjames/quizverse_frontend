import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { axiosPrivate } from "../../../config/axiosInstance";
const ModuleCreation = ({ course_id, module_num }) => {
  /*
   {
        "course_id": "string",
        "module_number": 0,
        "module_name": "string",
        "syllabus": "string"
    }
  */
  const [added, setAdded] = useState(false);
  const [module, setModule] = useState({
    course_id: course_id,
    module_number: module_num,
    module_name: "",
    syllabus: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const addModule = async () => {
    setIsSaving(true);
    if (module.module_name != "" && module.syllabus != "") {
      try {
        const response = await axiosPrivate.post("/admin/module/", module);
        console.log(response.data);
        toast.success("Module added");
        setAdded(true);
        setIsSaving(false);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
        setIsSaving(false);
      }
    } else {
      toast.error("Please enter module name and syllabus");
      setIsSaving(false);
    }
  };

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="flex justify-center m-5 ">
      <div
        className={`flex flex-col justify-center  ${
          isAccordionOpen ? "" : "h-[60px]"
        } bg-base-100  w-full  rounded-lg shadow-xl`}
      >
        <div
          className="flex justify-between rounded-t-xl mt-5 h-max  w-full  accordion-head cursor-pointer"
          onClick={toggleAccordion}
        >
          <h2 className="font-bold p-5 pb-0 ">
            <span className="badge badge-neutral  p-3  ">{module_num}</span>{" "}
            <span className=" italic px-5 "> module {module_num} </span>
          </h2>
          <span className="pt-6 pr-5">
            {isAccordionOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3 m-5 accordion-body  transition-all duration-500 ease-in-out ${
            isAccordionOpen ? "max-h-full" : "max-h-0 overflow-hidden"
          }`}
        >
          <div>
            <input
              type="text"
              placeholder="Type module name ..."
              className="input w-full input-bordered max-w-xs"
              value={module.module_name}
              onChange={(e) =>
                setModule({ ...module, module_name: e.target.value })
              }
            />
            <textarea
              placeholder="Type syllabus..."
              className="input w-full input-bordered  mt-2 h-32 max-w-xs"
              value={module.syllabus}
              onChange={(e) =>
                setModule({ ...module, syllabus: e.target.value })
              }
            />
          </div>
          <div>
            <button className="btn btn-outline w-28" onClick={addModule}>
              {isSaving ? (
                <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
              ) : added ? (
                "Added"
              ) : (
                "Add module"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModuleCreation;
