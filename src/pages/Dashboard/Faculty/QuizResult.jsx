import  { useEffect,useState } from 'react';

import quizResultData from './dummy_data/quizResult.json';
const QuizResult = ({ quizId }) => {
    const [quizData,setQuizData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {   
        setQuizData(quizResultData);
        setLoading(false);
    }, []);
    
    const quiz = quizData.quiz;
    const results = quizData.results;

    return (
        <>
        { loading? <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>: 
        <div className="container mx-auto px-4">
               
 
        <div className="w-full">
            <div className="bg-base-100 rounded-lg shadow-lg mb-5">
                <table className="table-fixed border-collapse w-full">
                 
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 font-bold text-center text-lg bg-base-200" colSpan={2}>{quiz.title}</td>
                        </tr>
                        {/* <tr>
                            <th className="border px-4 py-2 text-left">Quiz ID</th>
                            <td className="border px-4 py-2">{quiz.quizId}</td>
                        </tr> */}
                        <tr>
                            <th className="border px-4 py-2 text-left">Department</th>
                            <td className="border px-4 py-2">{quiz.department}</td>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 text-left">Subject</th>
                            <td className="border px-4 py-2">{quiz.subject}</td>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 text-left">Semester</th>
                            <td className="border px-4 py-2">{quiz.semester}</td>
                        </tr>
                    
                        <tr>
                            <th className="border px-4 py-2 text-left">Total Questions</th>
                            <td className="border px-4 py-2">{quiz.totalQuestions}</td>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 text-left">Total Marks</th>
                            <td className="border px-4 py-2">{quiz.totalMarks}</td>
                        </tr>
                        
                        
                        <tr>
                            <th className="border px-4 py-2 text-left">Date</th>
                            <td className="border px-4 py-2">{quiz.date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
    
    
        <div className="shadow-2xl ">
        <div className="w-full bg-base-100 border-base-300 mt-5 rounded border-2  h-96 overflow-y-auto no-scrollbar overflow-x-visible">

            <table className="table-auto w-full   ">
                <thead>
                    <tr className="bg-base-300"></tr>
                    <tr className="bg-base-300 ">
                        <th className="px-4 border  border-gray-400 py-2 font-bold">Student Name</th>
                        <th className="px-4 border border-gray-400 py-2 font-bold">Score</th>
                    </tr>
                </thead>
                {/* Data Rows */}
                
                <tbody>
                    {results && results.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? '' : 'bg-base-100'}>
                            <td className="border border-gray-400 px-4 py-2">{ result.score == -1 ? <span className='text-red-400'>{result.studentName}</span> : result.studentName}</td>
                            <td className="border border-gray-400 px-4 py-2 text-right">{ result.score == -1 ? <span className='text-red-400'>AB</span> : result.score }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        <div className='flex justify-center'> 
        <button className="btn btn-outline btn-active mt-3 " >
                      export to excel
                  </button>
        </div>
        
    </div>
        }
        
        
</>
    
    );
}

export default QuizResult;
