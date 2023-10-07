import React, { useEffect, useState } from 'react';
import Table from '../components/TableList/TableList.js';
import {APIgetQuestions} from '../services/APIquestionsService.js';


const QuestionList = () => {
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
  const columns = [{text: "Question text"}];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='questions-list'>
      <div className='section-title'>Questions List</div>
      <hr />
      <Table columns={columns} data={questions} className="mt-5"/>
    </div>
  );
};

export default QuestionList;
