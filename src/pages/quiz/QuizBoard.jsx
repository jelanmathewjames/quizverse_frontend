import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const QuizBoard = () => {
    const { getItem: getQuizid } = useLocalStorage('quiz_id')
    const { getItem: getQbankid } = useLocalStorage('qbank_id')

    const axiosPrivate = useAxiosPrivate()
    const [currentIndex, setCurrentIndex] = useState(1)
    const [question, setQuestion] = useState('')
    const [id, setId] = useState(null)
    const [questions, setQuestions] = useState([])
    const [option, setOption] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    console.log(getQuizid())
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/quiz/viva-question?quiz_or_viva_id=${getQuizid()}`
                )
                setQuestions(response.data)
                setQuestion(response.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        fetchQuestions()
    }, [])

    useEffect(() => {
        setQuestion(questions[currentIndex - 1])
    }, [currentIndex])

    useEffect(() => {
        // api quiz/viva-options?question_id=1&quiz_or_viva_id=1
        const fetchOptions = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/quiz/viva-options?question_id=${question.id}&quiz_or_viva_id=${getQuizid()}`
                )
                setOption(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOptions()
    }, [question])

    const saveQuiz = async (question_id) => {
        try {
            const response = await axiosPrivate.post('/quiz/response/', {
                option_id: selectedOption,
                question_id: question_id,
                quiz_or_viva_id: getQuizid(),
                malpractice: false,
            })
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-[100vh]  p-10 ">
            {question ? (
                <div className="w-full flex gap-5 flex-col items-center bg">
                    <div className="w-[80%]  ">
                        <div className="input-question border border-gray-600 rounded-lg p-5 ounded-lg">
                            {question.question}
                        </div>
                        <div className="mt-4 optionlist grid md:grid-cols-2 gap-4 grid-col-1 ">
                            {option.map((option, index) => (
                                <div
                                    key={option.id}
                                    className="mb-2 border flex border-gray-600 p-2 rounded-lg "
                                    htmlFor={`option-${index}`}
                                >
                                    <input
                                        type="radio"
                                        id={`option-${index}`}
                                        name="option"
                                        value={option.option}
                                        onChange={(e) =>
                                            setSelectedOption(option.id)
                                        }
                                    />
                                    <label
                                        className="w-full cursor-pointer "
                                        htmlFor={`option-${index}`}
                                    >
                                        {option.option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="join-item btn btn-neutral w-20"
                        onClick={() => {
                            saveQuiz(question.id)
                        }}
                    >
                        save
                    </button>

                    <div className="flex w-40  gap-1">
                        <button
                            className="join-item  btn btn-outline w-1/2"
                            disabled={currentIndex == 1}
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="join-item btn btn-outline w-1/2"
                            disabled={currentIndex == questions.length}
                            onClick={() => setCurrentIndex(currentIndex + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div>loading</div>
            )}
        </div>
    )
}

export default QuizBoard
