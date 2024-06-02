import React from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [city, setCity] = React.useState("");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const URL = `https://api.weatherapi.com/v1/current.json?key=2ec2fdbc0c014a5eb6a190053240901&q=${city}`;
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      setData(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name=""
          id=""
          placeholder="Enter city name"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          value={city}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p className="load">Loading data...</p>}
      {Array.isArray(data) || (
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temprature</h4>
            <p>{data.current.temp_c} &deg;C</p>
          </div>
          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{data.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h4>Condition</h4>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
