
import { Link } from "react-router-dom";

import HomeLayout from "../components/HomeLayout";

const Home = () => {
  return (
    <HomeLayout>
      <div className=" relative overflow-hidden dark:bg-gradient-to-l dark:from-slate-800 dark:to-slate-950 ">
          <div className="absolute opacity-50 animate-blob dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/2 left-1/3 transform translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-400 rounded-full "></div>
          <div className="absolute opacity-50 animate-blob animation-delay-2000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/2 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full "></div>
          <div className="absolute opacity-50 animate-blob animation-delay-4000 dark:mix-blend-overlay mix-blend-multiply filter blur-xl top-1/3 left-1/6 sm:left-1/3 transform translate-x-1/2 translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full "></div> 
        <div className="relative pt-10 flex items-center justify-center gap-10 mx-16 h-[100vh]">
          <div className=" space-y-6">
            <h1 className="text-5xl font-semibold text-center">
              Welcome to{" "}
              <span className="font-bold gradient-text"> QuizVerse</span>
            </h1>
            <p className="text-xl">
              We have large set of question library developed by qualified
              faculties
            </p>
            <div className="flex flex-row gap-3 justify-center ">
              <Link to="/signin">
                <button className="btn btn-outline  btn-active">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn ">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
