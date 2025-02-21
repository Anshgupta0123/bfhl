import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data.data)) {
        throw new Error('Input must be an array of strings');
      }
      const res = await axios.post('https://your-heroku-app.herokuapp.com/bfhl', data);
      setResponse(res.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ') || 'None'}</p>
        )}
        {selectedOptions.includes('Numbers') && (
          <p>Numbers: {response.numbers.join(', ') || 'None'}</p>
        )}
        {selectedOptions.includes('Highest alphabet') && (
          <p>Highest Alphabet: {response.highest_alphabet.join(', ') || 'None'}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., {"data": ["A", "1", "B", "2"]})'
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
