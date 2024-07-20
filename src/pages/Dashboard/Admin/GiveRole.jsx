import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const GiveRole = () => {
    /*
  dropdown - institution (get)

  */

    const axiosPrivate = useAxiosPrivate()
    const [userDetails, setUserDetails] = useState([])
    const [selectUsersId, setSelectUsersId] = useState([])
    const [searchData, setSearchData] = useState('')
    const [selectedRole, setSelectedRole] = useState('') // [Institution Admin, Community Admin
    const [institution, setInstitution] = useState([])
    const [selectedInstitution, setSelectedInstitution] = useState('')
    const handleInputChange = (event) => {
        setSearchData(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchIconClick()
        }
    }

    const handleSearchIconClick = () => {
        const searchUser = async (search) => {
            try {
                const response = await axiosPrivate.get(
                    `/auth/users?search=${search}`
                )
                if (response.data.length === 0) {
                    toast.error('User not found')
                }
                setUserDetails(response.data)
            } catch (error) {
                toast.error('Something went wrong')
            }
        }
        if (searchData != '') {
            searchUser(searchData)
        } else {
            getUserDetails()
        }
    }

    const handlerRoleChange = (event) => {
        setSelectedRole(event.target.value)
    }
    const handleInstitutionChange = (event) => {
        setSelectedInstitution(event.target.value)
    }
    const getUserDetails = async () => {
        try {
            const response = await axiosPrivate.get('/auth/users')
            setUserDetails(response.data)
        } catch (error) {
            setUserDetails([])
        }
    }
    useEffect(() => {
        getUserDetails()
    }, [])

    // fetch institution data from the backend
    useEffect(() => {
        if (selectedRole == 'Institution') {
            const getInstitution = async () => {
                try {
                    const response =
                        await axiosPrivate.get('/admin/institution')
                    setInstitution(response.data)
                } catch (error) {
                    setInstitution([])
                }
            }
            getInstitution()
        }
    }, [selectedRole])

    const giveRole = async () => {
        if (selectUsersId.length === 0) {
            toast.error('Please select a user')
            return
        }
        if (selectedRole === '') {
            toast.error('Please select a role')
            return
        }
        try {
            let response
            if (selectedRole === 'Institution') {
                response = await axiosPrivate.post('/admin/role/institution/', {
                    user_ids: selectUsersId,
                    entity_id: selectedInstitution,
                })
            } else if (selectedRole === 'Community') {
                response = await axiosPrivate.post('/admin/role/community/', {
                    user_ids: selectUsersId,
                    entity_id: selectedInstitution,
                })
            }
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="md:grid md:grid-cols-2 flex flex-col-reverse gap-3 ">
            {/* role selection */}
            <div className=" flex flex-col gap-4 items-center">
                <select
                    className="select select-bordered w-[80%] "
                    value={selectedRole}
                    onChange={handlerRoleChange}
                >
                    <option disabled value="">
                        Select Role
                    </option>
                    <option key={1} value={'Institution'}>
                        Institution Admin
                    </option>
                    <option key={2} value={'Community'}>
                        Community Admin
                    </option>
                </select>

                {/* conditional rendering */}
                {selectedRole === 'Institution' && (
                    <div>
                        <select
                            className="select select-bordered w-[80%]"
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

                <button
                    className="btn btn-neutral w-[80%] mb-5"
                    onClick={giveRole}
                >
                    Give Role
                </button>
            </div>

            {/* user detials */}
            <div className=" md:w-full w-[80%] flex flex-col mx-auto">
                <div className="searchBar">
                    <label className="input input-bordered flex items-center gap-2 ">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search Users.."
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
                <div className="w-full bg-base-100 border-base-300 mt-5 rounded border-2  h-80 overflow-y-auto no-scrollbar overflow-x-visible">
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
                                                if (
                                                    selectUsersId.includes(
                                                        user.id
                                                    )
                                                ) {
                                                    setSelectUsersId(
                                                        selectUsersId.filter(
                                                            (id) =>
                                                                id !== user.id
                                                        )
                                                    )
                                                } else {
                                                    setSelectUsersId([
                                                        ...selectUsersId,
                                                        user.id,
                                                    ])
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
    )
}

export default GiveRole
