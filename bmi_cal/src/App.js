import './App.css';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (event) => {
    event.preventDefault();

    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum < 20) {
      setMessage('Please enter valid numbers. Height must be at least 20 inches.');
      setBmi(null);
      return;
    }

    const weightInKg = weightNum * 0.453592; // Convert lbs to kg
    const heightInMeters = heightNum * 0.0254; // Convert inches to meters

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You are a healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const reload = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
  };

  return (
    <div className="App">
      <div className="container">
        <h2>BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder="Enter Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <label>Height (inches)</label>
            <input
              type="number"
              placeholder="Enter Height (e.g., 65 for 5'5'')"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="20"
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>

          <div className="center">
            {bmi && <h3>Your BMI is: {bmi}</h3>}
            <p>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
