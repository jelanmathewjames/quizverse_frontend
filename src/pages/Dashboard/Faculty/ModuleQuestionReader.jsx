import { useState } from "react";

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
    const data = {
      moduleName,
      moduleNumber,
      questions,
    };
    onQuestionData(data);
  };

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col justify-center bg-base-100 w-full pb-10 rounded-lg shadow-xl">
        {/* Heading with background image */}
        <div className="flex bg-gray-300 rounded-t-xl dark:bg-gray-900 w-full">
          <h2 className="font-bold p-5">
            <span className="badge">{moduleNumber}</span> {moduleName}
          </h2>
        </div>
        {/* Content below the heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-5 pt-12">
          {questions.map((question, index) => (
            <div
              key={index}
              className="w-full flex flex-wrap gap-2 flex-col bg"
            >
              <input
                className="input input-bordered input-primary w-full"
                type="text"
                value={question.question}
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
                placeholder={`Question ${index + 1}`}
              />
              <div className="flex w-full">
                <div className="flex w-full">
                <input
                  className="input input-bordered input-success w-1/2"
                  type="text"
                  value={question.answer}
                  onChange={(e) =>
                    updateQuestion(index, "answer", e.target.value)
                  }
                  placeholder="Enter answer"
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
                    className=" toggle toggle-info"
                  />
                </div>
              
              </div>
              {question.questionType === "mcq" &&
                question.options.map((option, optionIndex) => (
                  <input
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
          <button className="btn btn-outline w-32" onClick={addQuestion}>
            Add More
          </button>
          <button onClick={sendQuestionDataToParent}>save</button>
        </div>
      </div>
    </div>
  );
}

export default ModuleQuestionReader;
