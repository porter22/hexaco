import React, { useEffect, useState } from 'react';
import {APIgetQuestions} from '../services/APIquestionsService.js';

import CommonButton from '../components/Buttons/CommonButton/CommonButton.js';
import InputWithLabel from '../components/Inputs/InputWithLabel/InputWithLabel.js';

import './ResponseForm.scss';

const ResponseForm = () => {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const data = await APIgetQuestions();
      setQuestions(data);
    } catch(error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  const columns = ["text"];

  const handleResponseChange = (e, index) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = e.target.value;
    setResponses(updatedResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting responses:', responses);
  };

  return (
    <div className='response-form'>
      <div className='section-title'>Response Form</div>
      <hr />
      <div>
        {questions.map((question, index) => (
          <div key={question.id}>
            <InputWithLabel
              inputType="text"
              id={`response-${index}`}
              labelText={question.text}
              className="mr-5"
              placeholder="Group Name"
              value={responses[index] || ''}
              onChange={(e) => handleResponseChange(e, index)}
              required
            ></InputWithLabel>
            {/* <label htmlFor={`response-${index}`}>{question.text}</label>
            <input
              type="text"
              id={`response-${index}`}
              value={responses[index] || ''}
              onChange={(e) => handleResponseChange(e, index)}
            /> */}
          </div>
        ))}
        <div className='d-flex justify-space-between mt-4'>
            <div className='group-details-actions'>
            {isLoading ? (
                <div className="loader">Loading...</div>
              ) : (
                <CommonButton onClick={handleSubmit} classes="btn-prim mr-3">Submit</CommonButton>
              )}
            </div>
            <div className='employee-details-import'></div>
          </div>
      </div>
    </div>
  );
};

export default ResponseForm;
