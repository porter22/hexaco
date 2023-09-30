import React, { useState } from 'react';

const ResponseForm = ({ questions }) => {
  const [responses, setResponses] = useState([]);

  const handleResponseChange = (e, index) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = e.target.value;
    setResponses(updatedResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send responses to backend API
    console.log('Submitting responses:', responses);
  };

  return (
    <div>
      <h2>Response Form</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id}>
            <label htmlFor={`response-${index}`}>{question.text}</label>
            <input
              type="text"
              id={`response-${index}`}
              value={responses[index] || ''}
              onChange={(e) => handleResponseChange(e, index)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResponseForm;
