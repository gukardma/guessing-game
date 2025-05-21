import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/questions') //api endpoint from flask server
    .then(res => res.json()) // get data as json format
    .then(data => setQuestions(data));

    setCount(1);
  }, []);

  if(questions.length === 0) {
    return(
      <>
        <p>No data :(</p>
        {count}
        {/* {questions} */}
      </>
    )
  }
  else {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      <p>
        Fetched data from the db: {questions.map(item => <li>{item}</li>)}
      </p>
    </>
  )
  }
}

export default App;
