// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * No more use of this

    "proxy": "http://localhost:3001",

  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

const apiUrl = 'http://localhost:3001';

axios.defaults.withCredentials = true;

function App() {
  const storedJwt = localStorage.getItem('token');

  const [jwt, setJwt] = useState(storedJwt || null);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const [newFoodMessage, setNewFoodMessage] = useState(null);

  const getJwt = async () => {
    const { data } = await axios.get(`${apiUrl}/jwt`);
    setJwt(data.token);
  };

  const getFoods = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/foods`);
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const createFood = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/foods`);
      setNewFoodMessage(data.message);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(`${apiUrl}/csrf-token`);
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>
          Get Foods
        </button>
        <ul>
          {foods.map((food, i) => (
            <li>{food.description}</li>
          ))}
        </ul>
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>

      <section>
        <button onClick={() => createFood()}>
          Create New Food
        </button>
        {newFoodMessage && <p>{newFoodMessage}</p>}
      </section>

    </>
  );
}

export default App;
