import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <HomeLayout>
      <div className="pt-10 flex items-center justify-center gap-10 mx-16 h-[100vh]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold">
            Welcome to{" "}
            <span className="text-blue-500 font-bolds"> QuizVerse</span>
          </h1>
          <p className="text-xl">
            We have large set of question library developed by qualified
            faculties
          </p>
          <div className="space-x-6">
            <Link to="/login">
            <button className="btn btn-active btn-primar w-24 btn-primary">Login</button>
            </Link>
            <Link to="/signup">
            <button className="btn btn-outline w-24 btn-primary">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
