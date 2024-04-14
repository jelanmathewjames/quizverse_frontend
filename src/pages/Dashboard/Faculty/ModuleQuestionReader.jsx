import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown ,IoIosArrowUp } from "react-icons/io";
function ModuleQuestionReader({
  moduleName,
  moduleNumber,
  moduleId,
  onQuestionData,
  questionType,
}) {
  const [questions, setQuestions] = useState([
    {
      question: "",
      answer: "",
      options: ["", "", "", ""],
      moduleId: moduleId,
      questionType: questionType,
    },
    {
      question: "",
      answer: "",
      options: ["", "", "", ""],
      moduleId: moduleId,
      questionType: questionType,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
        options: ["", "", "", ""],
        moduleId: moduleId,
        questionType: questionType,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question") {
      newQuestions[index].question = value;
    } else if (field === "answer") {
      newQuestions[index].answer = value;
    } else if (field === "type") {
      newQuestions[index].questionType = value;
      console.log(newQuestions[index].questionType);
    } else {
      newQuestions[index].options[value.optionIndex] = value.optionValue;
    }
    setQuestions(newQuestions);
  };

  const sendQuestionDataToParent = () => {
    onQuestionData(questions);
  };

  const [isSaving, setIsSaving] = useState(false);

  const validateQuestions = () => {
    for (const question of questions) {
      if (question.question.trim() === "" || question.answer.trim() === "") {
        toast.error("Please fill in all question and answer fields.");
        return false;
      }
      if (question.questionType === "mcq") {
        for (const option of question.options) {
          if (option.trim() === "") {
            toast.error("Please fill in all options for MCQ questions.");
            return false;
          }
        }
      }
    }
    return true;
  };

  const saveQuestions = () => {
    if (validateQuestions()) {
      setIsSaving(true);
      sendQuestionDataToParent();
      setTimeout(() => {
        setIsSaving(false);
      setIsAccordionOpen(false);
        
        toast.success(`Module ${moduleNumber} Questions saved successfully.`);
      }, 500);
    } 
  };
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };


  return (
    <div className="flex justify-center m-5 ">
      <div className={`flex flex-col justify-center  ${isAccordionOpen? "" : "h-[60px]"} bg-base-100  w-full  rounded-lg shadow-xl`}>
        {/* Heading with background image */}
        
        <div className="flex justify-between rounded-t-xl mt-5 h-max  w-full  accordion-head cursor-pointer" onClick={toggleAccordion}>
          <h2 className="font-bold p-5 pb-0 ">
            <span className="badge badge-neutral  p-3  ">{moduleNumber}</span>{" "}
            <span className=" italic px-5 ">
              {" "}
              {moduleName}{" "}
            </span>
          </h2>
          <span className="pt-6 pr-5">
          {
            isAccordionOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
          }
          </span>
          
        </div>
        {/* Content below the heading */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 m-5 accordion-body  transition-all duration-500 ease-in-out ${isAccordionOpen ? 'max-h-full' : 'max-h-0 overflow-hidden'}`}>
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
              <div className="flex w-full">
                <div className="flex w-full">
                  <input
                    className="input input-sm input-bordered input-success w-1/2"
                    type="text"
                    value={question.answer}
                    onChange={(e) =>
                      updateQuestion(index, "answer", e.target.value)
                    }
                    placeholder="--Enter answer--"
                  />
                  <label
                    className="badge cursor-pointer"
                    htmlFor={`questionType-toggle-${index}`}
                  >
                    short answer or mcq{" "}
                  </label>
                  <input
                    type="checkbox"
                    id={`questionType-toggle-${index}`}
                    checked={question.questionType === "mcq"}
                    onChange={(e) => {
                      const newType = e.target.checked ? "mcq" : "shortanswer";
                      updateQuestion(index, "type", newType);
                    }}
                    className=" toggle "
                  />
                </div>
              </div>
              {question.questionType === "mcq" &&
                question.options.map((option, optionIndex) => (
                  <input
                    className="input input-bordered input-sm   w-full max-w-xs"
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      updateQuestion(index, "options", {
                        optionIndex,
                        optionValue: e.target.value,
                      })
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                ))}
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
              {isSaving ? <div className="animate-spin rounded-full  w-5 h-5 border-t-2 border-b-3 dark:border-[black] border-[#ffffff]"></div>: "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleQuestionReader;
