import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [resultState, setResultState] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5050/api/questions') //api endpoint from flask server
    .then(res => res.json()) // get data as json format
    .then(data => {
      setQuestions(shuffle(data));
    
    })  //shuffle question order
    
    
  }, []);

  //chcek if result state should be enabled, otherwise save answer input and increment display question
  const handleClick = (next_answer) => {
    questionIndex >= questions.length - 1 ? setResultState(true) : setResultState(false);

    if(!resultState){ //avoid null pointer error and extra answer logging
      setAnswers(answers => [...answers, next_answer]);
      setQuestionIndex(prevIndex => prevIndex + 1);
    } 
  }

  //shuffle function
  const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
};

  if(questions.length === 0) {
    return(
      <>
        <p>No data :(</p>
        {/* {questions} */}
      </>
    )
  }
  else {

  return (
    <>

        <h2>{resultState ? "Your result is: " : questions[questionIndex]}</h2>
        <button disabled={resultState} onClick={() => handleClick(1)}>Yes</button>
        <button disabled={resultState} onClick={() => handleClick(0)}>No</button>

        <p>{answers}</p>
        {resultState ? <button onClick={() => window.location.reload()}>Submit</button> : null} 
        {/* placeholder submit functionality*/}
      
      <p>
        Fetched data from the db: {questions.map(item => <li>{item}</li>)}
      </p>  
    </>
    )
  }
}

export default App;
