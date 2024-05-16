import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function debounce(callback, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.call(this, ...args);
      timer = null;
    }, delay);
  }
}

function useAbortController() {
  const ref = React.useRef();
  return ref.current;
}


function App() {
  const [responseList, setResponseList] = useState([]);
  const debouncedApiCall = debounce(apiCall);
  let abortController = useAbortController();

  function apiCall(param) {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    return fetch(`http://localhost:3000/search?q=${param}`, { signal: abortController.signal })
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
  }

  const handleOnChange = e => {
    let value = e.target.value;
    debouncedApiCall(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get('username'))
    console.log(formData.get('password'))
    console.log(formData.entries());
    console.log([...formData.entries()])
    console.log(Object.entries(formData.entries()))
    const { username, password } = Object.entries(formData.entries());
    console.log("username, password", username, password);
  }


  return (
    <>
      <div>
        <input
          onChange={handleOnChange}
          type='text' />

        <form onSubmit={handleSubmit}>

          <label htmlFor="username">Username:</label>
          <input type='text' id='username' name="username" />


          <br />

          <label htmlFor="password">Password:</label>
          <input type='password' id='password' name="password" />

          <button type='submit' >Submit</button>

        </form>
      </div>
    </>
  )
}

export default App
