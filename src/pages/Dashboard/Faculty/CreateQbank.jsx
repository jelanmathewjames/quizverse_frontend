import { useEffect, useState } from "react";

import subjectsData from './subjects.json';


const CreateQbank = () => {
    const [subjects, setSubjects] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [questionBanks, setQuestionBanks] = useState([]);
    const [numQuestions, setNumQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSubjects(subjectsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const handleNumQuestionsChange = (event) => {
        setNumQuestions(parseInt(event.target.value));
    };

    const handleQuestionChange = (event, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = event.target.value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (event, questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        if (!question.options) {
            question.options = [];
        }
        question.options[optionIndex] = event.target.value;
        setQuestions(updatedQuestions);
    };

    const handleSave = () => {
        const questionBank = {
            subject: selectedSubject,
            questions: questions.slice(0, numQuestions)
        };
        // TODO: Post questionBank to API
        console.log(questionBank);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create Question Bank</h1>
            <select className="select select-bordered w-full max-w-xs mb-4" value={selectedSubject} onChange={handleSubjectChange}>
                <option disabled selected value="">Select Subject</option>
                {subjects && subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
            </select>
            <input type="number" className="input input-bordered w-full max-w-xs mb-4" value={numQuestions} onChange={handleNumQuestionsChange} />
            {Array.from({ length: numQuestions }, (_, index) => (
                <div key={index} className="mb-4">
                    <input type="text" className="input input-bordered w-full mb-2" value={questions[index] || ''} onChange={(event) => handleQuestionChange(event, index)} />
                    {Array.from({ length: 4 }, (_, optionIndex) => (
                        <input key={optionIndex} type="text" className="input input-bordered w-full mb-2" value={(questions[index]?.options || [])[optionIndex] || ''} onChange={(event) => handleOptionChange(event, index, optionIndex)} />
                    ))}
                </div>
            ))}
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
    );
}

export default CreateQbank;
