import { motion } from "framer-motion";

import HomeLayout from "../components/HomeLayout";
import { formVariants } from "../helpers/animationHelpers/formVariants";
const About = () => {
    return (
        <HomeLayout>
            
      <div className="flex items-center  justify-center h-[100vh] relative overflow-hidden ">
        <div className="absolute opacity-40 animate-blob dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/2 left-1/3 transform translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full "></div>
        <div className="absolute opacity-40 animate-blob animation-delay-2000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/2 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full "></div>
        <div className="absolute opacity-40 animate-blob animation-delay-4000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/6 sm:left-1/3 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full "></div>

        <motion.div
          {...formVariants}
          className="flex flex-col justify-center gap-3 rounded-lg border-[1px]  p-10 backdrop-blur-md shadow-2xl 
          w-[80vw] sm:w-[410px] 
          "
        >
            <h1>About Quizverse</h1>
            <p>
                Quizverse is an interactive quiz application designed to test your knowledge and challenge your brain. 
                With a wide range of topics and difficulty levels, Quizverse offers a fun and engaging way to learn and 
                explore various subjects.
            </p>
            <p>
                Our mission is to provide an educational platform that promotes learning through quizzes. Whether you're 
                a student looking to study for exams, a trivia enthusiast, or simply someone who enjoys a good challenge, 
                Quizverse has something for everyone.
            </p>
            <p>
                Join us on this exciting journey and embark on a quest to expand your knowledge, improve your skills, and 
                have fun along the way. Get ready to dive into the world of quizzes with Quizverse!
            </p>
            
        </motion.div>
            
    </div>    
            
        </HomeLayout>
    );
};

export default About;