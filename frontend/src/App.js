import { useState } from 'react';
import './App.css';

function App() {
  const [usersDetail, setUserDetail] = useState({});
  const [userId, setUserId] = useState(""); 
  
  const handleForm = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:9000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })  // Correctly send userId as a JSON object
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserDetail(data);  // Update the state with fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleForm}> {/* Attach handleForm to form submission */}
        <label htmlFor='input'>User ID:</label>
        <input 
          type='text' 
          placeholder='Enter the user ID' 
          id='input' 
          value={userId}  // Bind the input value to userId state
          onChange={(e) => setUserId(e.target.value)}  // Correctly capturing the input value
        />
        <button type='submit'>Submit</button>
      </form>
      <div>
        <p>{JSON.stringify(usersDetail)}</p>
      </div>
    </div>
  );
}

export default App;
