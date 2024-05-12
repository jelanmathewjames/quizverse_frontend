import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { axiosPrivate } from "../../../config/axiosInstance";

const ModuleQuestionReadWrite = ({
    module_name,
    module_number,
    module_id,
    quiz_id,
    question_number,
  }) => {
  
  const [questionNumber, setQuestionNumber] = useState(question_number + 2);
  const [questions, setQuestions] = useState([
    { 
      qbank_id: quiz_id,
      question: "",
      question_number: questionNumber -2,
      options: [
        { option_number: "A", option: "", is_correct: false },
        { option_number: "B", option: "", is_correct: false },
        { option_number: "C", option: "", is_correct: false },
        { option_number: "D", option: "", is_correct: false },
      ],
      module_id: module_id,
      question_type: "MCQ"
    },

    {
      qbank_id: quiz_id,
      question: "",
      question_number: questionNumber -1,
      options: [
        { option_number: "A", option: "", is_correct: false },
        { option_number: "B", option: "", is_correct: false },
        { option_number: "C", option: "", is_correct: false },
        { option_number: "D", option: "", is_correct: false },
      ],
      module_id: module_id,
      question_type: "MCQ"
    },
  ]);
  // setLastQuestionNumber(prevLastQuestionNumber => prevLastQuestionNumber + 2);
  const addQuestion = () => {
   setQuestionNumber(questionNumber + 1);
    setQuestions([
      ...questions,
      {
        qbank_id: quiz_id,
        question: "",
        question_number:questionNumber,
        options: [
          { option_number: "A", option: "", is_correct: false },
          { option_number: "B", option: "", is_correct: false },
          { option_number: "C", option: "", is_correct: false },
          { option_number: "D", option: "", is_correct: false },
        ],
        module_id: module_id,
        question_type: "MCQ"
      },
    ]);
  };
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question") {
      newQuestions[index].question = value;
    } else if (field === "options") {
      if ('optionValue' in value) {
        newQuestions[index].options[value.optionIndex].option = value.optionValue;
      }
      if ('isCorrect' in value) {
        newQuestions[index].options[value.optionIndex].is_correct = value.isCorrect;
      }
    }
    setQuestions(newQuestions);
    console.log(questions);
  };

  const [isSaving, setIsSaving] = useState(false);
  const checkIfEveryQuestionHasCorrectOption = (questions) => {
    return questions.every(question => question.options.some(option => option.is_correct));
  }
  const checkIfEveryOptionHasValue = (questions) => {
    return questions.every(question => 
      question.options.every(option => option.option.trim() !== "")
    )
  }
  const validateQuestions = () => {
    for (const question of questions) {
      if (question.question.trim() === ""){
        toast.error("Please fill in all question fields.");
        return false;
      }
      if(!checkIfEveryQuestionHasCorrectOption(questions)){
        toast.error("Please select the correct option for each question.");
        return false;
      }
      if(!checkIfEveryOptionHasValue(questions)){
        toast.error("Please fill in all option fields.");
        return false;
      }
      }
    return true;
  };

  const saveQuestions = async () => {
    if (validateQuestions()) {
      setIsSaving(true);
      try {
        const response = await axiosPrivate.post("/quiz/question/", questions);
        toast.success(response.data.message);
        setIsAccordionOpen(false);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsSaving(false);
        setIsAccordionOpen(false);
      }
    }
  };
  
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };



  return (
    <div className="flex justify-center mb-2  ">
      <div
        className={`flex flex-col justify-center  ${
          isAccordionOpen ? "" : "h-[60px]"
        } bg-base-100  w-full  rounded-lg shadow-xl`}
      >
        {/* Heading with background image */}

        <div
          className="flex justify-between rounded-t-xl mt-5 h-max  w-full  accordion-head cursor-pointer"
          onClick={toggleAccordion}
        >
          <h2 className="font-bold p-5 pb-0 ">
            <span className="badge badge-neutral  p-3  ">{module_number}</span>{" "}
            <span className=" italic px-5 "> {module_name} </span>
          </h2>
          <span className="pt-6 pr-5">
            {isAccordionOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </div>

        {/* Content below the heading */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3 m-5 accordion-body  transition-all duration-500 ease-in-out ${
            isAccordionOpen ? "max-h-full" : "max-h-0 overflow-hidden"
          }`}
        >
          {questions.map((question, index) => (
            <div
              key={index}
              className="w-full flex flex-wrap gap-2 flex-col bg"
            >
              <input
                className="input  input-bordered input-primary w-full"
                type="text"
                value={question.question}
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
                placeholder={`----Type question ${index + 1}--------`}
              />
              {
                question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-1 items-center">
                    <input
                      className={`input input-bordered ${option.is_correct ? 'input-success' : ''} input-sm w-full max-w-xs`}
                      type="text"
                      value={option.option}
                      onChange={(e) =>
                        updateQuestion(index, "options", {
                          optionIndex,
                          optionValue: e.target.value,
                        })
                      }
                      placeholder={`Option ${option.option_number}`}
                    />
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={option.is_correct}
                      onChange={(e) =>
                        updateQuestion(index, "options", {
                          optionIndex,
                          isCorrect: e.target.checked,
                        })
                      }
                    />
                  </div>
                ))
                }
            </div>
          ))}
          <div>
            <button className="btn btn-outline w-28" onClick={addQuestion}>
              Add More
            </button>
            <button
              onClick={saveQuestions}
              className={`btn btn-neutral w-28 ml-2 ${
                isSaving ? "animate-pulse" : ""
              }`}
            >
              {isSaving ? (
                <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleQuestionReadWrite;
