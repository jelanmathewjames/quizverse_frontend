import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import ProfileCard from '../../../components/ProfileCard';
import { containerVariants } from '../../../helpers/animationHelpers/containerVariants';
const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({ name: '', id: '', department: '', role: '', registerNum: '' });
  useEffect(() => {
    setProfileDetails({
      name: "Jelan Mathew James",
      id: "32",
      department: "computer science",
      role: "faculty",
      registerNum: "ADR21CS032"
    });
  }, []);

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
        profileDetails.name ? (
          <div className="flex flex-col gap-4 p-4">
            <ProfileCard
              name={profileDetails.name}
              id={profileDetails.id}
              department={profileDetails.department}
              role={profileDetails.role}
              registerNum={profileDetails.registerNum}
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
