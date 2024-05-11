import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { axiosPrivate } from "../../../config/axiosInstance";

const CreateInstitute = () => {
  const [educationSystem, setEducationSystem] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [institution, setInstitution] = useState("");
  const [name,setName] = useState("");
  const [place,setPlace] = useState("");
  const [educationSystemRead, setEducationSystemRead] = useState("");


  const handleInstitutionChange = (event) => {
    setInstitution(event.target.value);
  };

  const handleEducationChange = (event) => {
    setEducationSystemRead(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };
  const handleEducationSelectChange = (event) => {
    setSelectedEducation(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        createEducationSystem();
    }
  };
  const createInstitute = async() => {
    if (name != "" && place != "" && institution != "" && selectedEducation != "") {
      try {
        const response = await axiosPrivate.post("/admin/institution/", {
          name: name,
          place: place,
          institution_type: institution,
          education_system_id: selectedEducation
        });
        toast.success("Institution created successfully");
        setName("");
        setPlace("");
        setInstitution("");
        setSelectedEducation("");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please enter a value");
    }
  }
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
  },[]);

  const createEducationSystem = async () => {
    if (educationSystemRead != "") {
      try {
        const response = await axiosPrivate.post("/admin/education-system/", {
          name: educationSystemRead,
        });
        console.log(response.data);
        toast.success("Education system created successfully");
        setEducationSystem("");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please enter a value");
    }
  };
  return (
    <div className="md:grid md:grid-cols-2 flex flex-col-reverse gap-10 pt-5">
      {/* institution create  */}
      <div className="flex flex-col gap-3 items-center">
      <input
          type="text"
          placeholder="Type institution name ..."
          className="input w-full mt- max-w-xs"
          value={name}
          onChange={handleNameChange}
        />
          <input
          type="text"
          placeholder="Type place ..."
          className="input w-full mt- max-w-xs"
          value={place}
          onChange={handlePlaceChange}
        />
        <select
          className="select select-bordered  w-full mt- max-w-xs"
          value={institution}
          onChange={handleInstitutionChange}
        >
          <option disabled value="">
            Select Institution type..
          </option>
            <option key={1} value={"SCHOOL"}>
                SCHOOL
            </option>
            <option key={2} value={"COLLEGE"}>
                 COLLEGE
            </option>
        </select>
        <select
          className="select select-bordered  w-full mt- max-w-xs"
          value={selectedEducation}
          onChange={handleEducationSelectChange}
        >
          <option disabled value="">
            Select education system type..
          </option>
          {
          
          educationSystem !="" &&  educationSystem.map(system => (
        <option key={system.id} value={system.id}>
          {system.name}
        </option>
      ))}

        </select>
        <button
          className="btn btn-neutral w-80 mt-1 "
          onClick={createInstitute}
        >
          Create Institute
        </button>
      </div>
      {/* education system */}

      <div className="flex flex-col items-center">
        <input
          type="text"
          id="education-system"
          placeholder="Type Education system name ..."
          className="input w-full mt- max-w-xs"
          value={educationSystemRead}
          onChange={handleEducationChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn btn-neutral w-80 mt-4 "
          onClick={createEducationSystem}
        >
          Create Education system
        </button>
      </div>
    </div>
  );
};

export default CreateInstitute;
