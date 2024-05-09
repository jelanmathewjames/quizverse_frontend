import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const GiveRole = () => {
 /*
  dropdown - institution (get)

  */

  const axiosPrivate = useAxiosPrivate();
  const [userDetails, setUserDetails] = useState([]);
  const [selectUsersId, setSelectUsersId] = useState([]); 
  const [searchData, setSearchData] = useState("");
  const [selectedRole,setSelectedRole] = useState(""); // [Institution Admin, Community Admin
  const [institution, setInstitution] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const handleInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchIconClick();
    }
  };

  const handleSearchIconClick = () => {    
    const searchUser = async (search) => {
        try {
          const response = await axiosPrivate.get(`/auth/users?search=${search}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error(error);
          toast.error("User not found");
        }
    }
    if( searchData != ""){
        searchUser(searchData);
    }else{
        getUserDetails();
    } 
  };
 
  const  handlerRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
  }
  const getUserDetails = async () => {
    try {
      const response = await axiosPrivate.get("/auth/users");
      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");

    }
  };
  useEffect(() => { 
    getUserDetails();
  }, []);
   
  // fetch institution data from the backend
  useEffect(() => {
    if(selectedRole == "Institution"){
      const getInstitution = async () => {
        try {
          const response = await axiosPrivate.get("/admin/institution");
          setInstitution(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getInstitution();
    }

   }, [selectedRole]);

  const giveRole = async () => {
    if (selectUsersId.length === 0) {
      toast.error("Please select a user");
      return;
    }
    if (selectedRole === "") {
      toast.error("Please select a role");
      return;
    }
    try {
      if (selectedRole === "Institution") {
        await axiosPrivate.post("/admin/role/institution/", {
            user_ids: selectUsersId,
            entity_id: selectedInstitution
          });
      } else if (selectedRole === "Community") {
        await axiosPrivate.post("/admin/role/community/", {
            user_ids: selectUsersId,
            entity_id: selectedInstitution
          });
      }
      toast.success("Role given successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  }
  return (
    <div className="grid grid-cols-2">
      {/* role selection */}
      <div className=" flex flex-col gap-4">
        
         <select
          className="select select-bordered w-[400px] sm:w-[200px] md:w-[500px] max-w-xs"
          value={selectedRole}
          onChange={handlerRoleChange}
        >
          <option disabled value="">
            Select Role
          </option>
            <option key={1} value={"Institution"}>
                Institution Admin
            </option>
            <option key={2} value={"Community"}>
                 Community Admin
            </option>
        </select>

        {/* conditional rendering */}
        {selectedRole === "Institution" && (
          <div>
            <select
              className="select select-bordered w-[400px] sm:w-[200px] md:w-[500px] max-w-xs"
              value={selectedInstitution}
              onChange={handleInstitutionChange}
            >
              <option disabled value="">
                Select Institution
              </option>
              {institution.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="btn btn-neutral w-80" onClick={ giveRole }>Give Role</button>
      </div>


      {/* user detials */}
      <div className=" w-72">
        <div className="searchBar">
          <h1 className="text-xl font-bold mb-2 ml-1">User Details</h1>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchData}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 cursor-pointer" 
              onClick={handleSearchIconClick} 
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="user-table">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectUsersId.includes(user.id)) {
                          setSelectUsersId(
                            selectUsersId.filter((id) => id !== user.id)
                          );
                        } else {
                          setSelectUsersId([...selectUsersId, user.id]);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GiveRole;
