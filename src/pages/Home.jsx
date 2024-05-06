import { motion } from "framer-motion";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

import HomeLayout from "../components/HomeLayout";
import { homeVariants } from "../helpers/animationHelpers/homeVariants";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    const [gridCells, setGridCells] = useState([]);
    const text = "Revolutionizing Examination Experience";
    const characters = text.split('');
    const characterVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: (i) => ({
         opacity: 1,
         y: 0,
         transition: {
           delay: i * 0.08, 
         },
      }),
     };

    useEffect(() => {
      const cells = Array.from({ length: 100 }, (_, index) => (
      <div
        key={index}
        className="border border-violet-600 rounded-xl p-5 opacity-10 dark:border-slate-800 dark:opacity-20 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:opacity-30 dark:hover:border-slate-700 dark:hover:shadow-xl dark:hover:scale-105 dark:hover:rotate-12 hover:shadow-xl hover:scale-125 ease-in-out "
      ></div>
      ));
      setGridCells(cells);
    }, []);

    return (
       
      <motion.div
      {...homeVariants}
      >

      <HomeLayout>
      <div className="relative overflow-hidden dark:bg-gradient-to-l dark:from-slate-800 dark:to-slate-950 ">
      
        <div className="absolute opacity-50 animate-blob dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/2 left-1/3 transform translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full "></div>
        <div className="absolute opacity-50 animate-blob animation-delay-2000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/2 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full "></div>
        <div className="absolute opacity-50 animate-blob animation-delay-4000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/6 sm:left-1/3 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full "></div>
        <div className="z-0 grid grid-cols-12 grid-rows-12 absolute w-[1800px] h-[1600px]">
        {/* Grid cells */}
        {gridCells}
        </div>
        <div className="relative pt-10 flex items-center justify-center gap-10 mx-16 h-[100vh]">
        <div className="space-y-6">
          <h1 className="text-5xl font-semibold text-center">
          Welcome to{" "}
          <span className="font-bold gradient-text "> QuizVerse</span>
          </h1>
          <p className="text-xl text-center">
    {characters.map((char, index) => (
      <motion.span
        key={index}
        variants={characterVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
        {char}
      </motion.span>
    ))}
 </p>
          <div className="flex flex-row gap-3 justify-center ">
          {auth?.user ? 
          (
            <Link to="/dashboard">
              <button className="btn btn-active">Dashboard</button>
            </Link>
          ) : 
          (
            <>
            <Link to="/signin">
              <button className="btn btn-active">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn ">Sign up</button>
            </Link>
          </>
            
          )
          }
          
          </div>
        </div>
        </div>
      </div>
      </HomeLayout>
      </motion.div>

    );
  };



export default Home;
