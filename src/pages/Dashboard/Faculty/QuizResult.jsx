
const QuizResult = ({quizId}) => {
    return (
        <div>
            quizId : {quizId}
            display list of students who took the quiz with mark .
            if quiz not completed then display quiz is not completed , also display the expire time for quiz.
        </div>
    );
}

export default QuizResult;
