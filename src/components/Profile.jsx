import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";

import { containerVariants } from '../helpers/animationHelpers/containerVariants';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ProfileCard from './ProfileCard';

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth();
  useEffect(() => {
    try {
      const profileHelper = async () => {
        const response = await axiosPrivate.get("/auth/user")
        console.log(response);
        setProfileDetails({
          username: response.data.username,
          email: response.data.email,
          roles: auth?.roles,
          verified: response.data.is_verified == false ? "Email is Not Verified" : "Verified Profile"
        });
        }
        profileHelper(); 
    }
    catch (e) {
      toast.error(
        e
      );
    }
  },[auth, axiosPrivate]);

// fetch data from server by api calls
//-------------------------------------------
// useEffect(() => {
//   const fetchProfileDetails = async () => {
//     try {
//       const response = await axios.get('/api/profile');
//       setProfileDetails(response.data);
//     } catch (error) {
//       console.error('Failed to fetch profile details:', error);
//     }
//   };
//   fetchProfileDetails();
// }, []);


  return (
    <motion.div className='w-full  'initial="hidden"
    animate="visible" variants={containerVariants} >
      {
        profileDetails.username ? (
          <div className="flex flex-col gap-4 p-4">
            <ProfileCard
              username={profileDetails.username}
              email={profileDetails.email}
              role={profileDetails.role}
              verified={profileDetails.verified}
            ></ProfileCard>
          </div>
        ) : (
          <div className='flex h-[90vh] w-full justify-center items-center'>
          <div className="animate-spin rounded-full  w-7 h-7 border-t-2 border-b-3 dark:border-[black] border-[#782b2bc5]"> </div>

          </div>
        )
      }
     
      
    </motion.div>
  );
}

export default Profile;
