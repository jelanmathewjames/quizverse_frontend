import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { containerVariants } from "../../../helpers/animationHelpers/containerVariants";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
const TakeQuiz = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {setItem : setQuizIdItem} = useLocalStorage('quiz_id');
  const {setItem : setQbankIdItem} = useLocalStorage("qbank_id");

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [quizId, setQuizId] = useState(null);
  const [qbankId, setQbankId] = useState(null);
  const [duration, setDuration] = useState(null);
  const [title, setTitle] = useState(null);
  const [data, setData] = useState(null);
  const handleClickOutside = (event) => {
    if (popupRef.current) {
      if (
        !popupRef.current.contains(event.target) &&
        event.target !== popupRef.current
      ) {
        setShowPopup(false);
      }
    }
  };

  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const attendQuiz = async (quiz_id, qbank_id, duration) => {
    setQuizId(quiz_id);
    setQbankId(qbank_id);
    setDuration(duration);
    setQuizIdItem(quiz_id);
    console.log(quiz_id);
    setQbankIdItem(qbank_id);
    console.log(qbank_id);
    setShowPopup(true);
  };

  const startQuiz = async () => {
    try {
      const response = await axiosPrivate.get(`/quiz/start-viva?quiz_or_viva_id=${quizId}` );
      setShowPopup(false);
      toast.success(response.data.messge);
      
      navigate(`/quiz/${response.data.id}`);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //fetch  quizzes that available to student
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosPrivate.get("/quiz/viva");
        setAvailableQuizzes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        {availableQuizzes.length ? (
          availableQuizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              className="bg-base-100 rounded-lg shadow-lg p-4 flex justify-between items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-3 ">
                  {quiz.title}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                <span className="badge badge-neutral">Start Date:{" "} </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(quiz.start_time).toLocaleDateString()}
                  </span>
                  <span className="badge badge-neutral"> {" "}Start Time:{" "} </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(quiz.start_time).toLocaleTimeString()}
                  </span>
                </p>
                <p className="text-gray-500 text-sm mb-1">
                <span className="badge badge-accent">End Date:{" "} </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(quiz.end_time).toLocaleDateString()}
                  </span>
                  <span className="badge badge-accent">End Time:{" "} </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(quiz.end_time).toLocaleTimeString()}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                <span className="badge">Duration:{" "} </span>
 
                  {quiz.duration} min
                </p>
              </div>
              <button
                className="btn btn-active btn-neutral"
                onClick={() => attendQuiz(quiz.id, quiz.qbank, quiz.duration)}
              >
                Attend
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-500">
            No quizzes available
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-all ease-in-out delay-75">
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div
              ref={popupRef}
              className="z-20 m-10 p-5 w-80 lg:w-[600px] rounded-lg shadow-2xl bg-base-300 ring-1 ring-black ring-opacity-5 overflow-y-auto transition-all duration-300 ease-in-out transform scale-100"
              style={{ maxHeight: "80vh" }}
            >
              <div className="flex flex-col">
                <div>
                  <h2 className="text-2xl font-bold text-center text-gray-800">
                    {title}
                  </h2>
                  <p className="text-center text-gray-500">
                    Duration: {duration} min
                  </p>
                  <div className="flex items-center gap-2 p-2">
                    <span className="text-red-500">
                      <FaTriangleExclamation />
                    </span>
                    <p className="text-red-500">
                      By starting this quiz, you agree not to use any
                      unauthorized aids or attempt to cheat. Violations may
                      result in immediate disqualification.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 p-4">
                  <button
                    className="btn btn-active btn-neutral"
                    onClick={startQuiz}
                  >
                    Start Quiz
                  </button>
                  <button
                    className="btn btn-active btn-neutral"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TakeQuiz;
