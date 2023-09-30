import React, { useState, useEffect } from 'react';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch question data from backend API
    fetch('/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
