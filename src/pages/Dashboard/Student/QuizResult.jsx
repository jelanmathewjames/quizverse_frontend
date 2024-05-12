import { useEffect, useState } from "react";

import { axiosPrivate } from "../../../config/axiosInstance";



const QuizResult = ({quizId}) => {
    /*
    // Fetch the quiz result data from the backend using the quizId
    course_name
    quiz_name
    faculty_name
    total_marks
    marks_obtained
    date
    total_questions
    */
    const [quizResultData, setQuizResultData] = useState({
        course_name: "sample course",
        quiz_name: "sample quiz name",
        faculty_name: "faculty name",
        total_marks: "100",
        marks_obtained: "80",
        date: "2021-09-01",
        total_questions: "10",
    });
    //fetch the quiz result data from the backend using the quizId
    useEffect(() => {
        const fetchQuizResultData = async () => {
            try {
                const response = await axiosPrivate.get(`/api/quiz/${quizId}`);
                setQuizResultData(response.data);
            } catch (error) {
                console.error("Error fetching quiz result data:", error);
            }
        };
        fetchQuizResultData();
    }, [quizId]);

    return (
        <div className="w-full">
            <div className="bg-base-100 rounded-lg shadow-lg mb-5">
                <table className="table-fixed border-collapse w-full">
                 
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 font-bold text-center text-lg bg-base-200" colSpan={2}>{quizResultData.quiz_name}</td>
                        </tr>
                        {/* <tr>
                            <th className="border px-4 py-2 text-left">Quiz ID</th>
                            <td className="border px-4 py-2">{quiz.quizId}</td>
                        </tr> */}
                       
                        <tr>
                            <th className="border px-4 py-2 text-left">Course</th>
                            <td className="border px-4 py-2">{quizResultData.course_name}</td>
                        </tr>
                   
                    
                        <tr>
                            <th className="border px-4 py-2 text-left">Total Questions</th>
                            <td className="border px-4 py-2">{quizResultData.total_questions}</td>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 text-left">Total Marks</th>
                            <td className="border px-4 py-2">{quizResultData.total_marks}</td>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 text-left">Marks Obtained</th>
                            <td className="border px-4 py-2">{quizResultData.marks_obtained}</td>
                        </tr>
                        
                        
                        <tr>
                            <th className="border px-4 py-2 text-left">Date</th>
                            <td className="border px-4 py-2">{quizResultData.date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuizResult;
