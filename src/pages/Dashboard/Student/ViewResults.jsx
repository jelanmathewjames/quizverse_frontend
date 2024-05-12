import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsGraphUpArrow } from "react-icons/bs";

import { containerVariants } from '../../../helpers/animationHelpers/containerVariants';
import recentQuizzes from '../Faculty/dummy_data/recentQuizzes.json';
import QuizResult from './QuizResult';

const ViewResults = () => {
    const [quizData, setQuizData] = useState([]);
    const [showQuizList, setShowQuizList] = useState(true);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    useEffect(() => { 
        setQuizData(recentQuizzes);
      },[]);

    const handleButtonClick = (quizId) => {
        setSelectedQuizId(quizId); // Set the selected quizId
        setShowQuizList(false); // Hide the quiz list
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            {showQuizList ? (
                quizData.map((quiz) => (
                    <motion.div
                        key={quiz.quizId}
                        className="bg-base-100 rounded-lg shadow-lg p-4 flex justify-between items-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{quiz.quizName}
                            <br />
                            <span className="text-gray-500 text-sm">{quiz.quizDate}</span>
                            <p className="text-gray-500 text-sm">{quiz.quizSubject}</p>
                        </h2>
                        <button className="btn btn-active btn-neutral" onClick={() => handleButtonClick(quiz.quizId)}>
                            <BsGraphUpArrow />
                            Result
                        </button>
                    </motion.div>
                ))
            ) : (
                <QuizResult quizId={selectedQuizId} />
            )}
        </div>
    );
}

export default ViewResults;
