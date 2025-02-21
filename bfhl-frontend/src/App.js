import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponseData(null);

        try {
            const jsonData = JSON.parse(inputData);
            const response = await axios.post('https://bfhl-iksz.onrender.com', jsonData);
            setResponseData(response.data);
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleSelectChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!responseData) return null;

        const { numbers, alphabets, highest_alphabet } = responseData;
        const selectedData = {
            Numbers: selectedOptions.includes('Numbers') ? numbers : [],
            Alphabets: selectedOptions.includes('Alphabets') ? alphabets : [],
            'Highest Alphabet': selectedOptions.includes('Highest Alphabet') ? highest_alphabet : []
        };

        return (
            <div>
                <h3>Response:</h3>
                <pre>{JSON.stringify(selectedData, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Enter JSON data here...'
                    rows="4"
                    cols="50"
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <select multiple onChange={handleSelectChange}>
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest Alphabet">Highest Alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;