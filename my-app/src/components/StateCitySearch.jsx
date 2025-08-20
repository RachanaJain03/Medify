import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StateCitySearch() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // fetch state list once
  useEffect(() => {
    fetch("https://meddata-backend.onrender.com/states")
      .then(r => r.json())
      .then(setStates)
      .catch(console.error);
  }, []);

  // fetch cities when state changes
  useEffect(() => {
    if (!state) { setCities([]); setCity(""); return; }
    fetch(`https://meddata-backend.onrender.com/cities/${encodeURIComponent(state)}`)
      .then(r => r.json())
      .then(setCities)
      .catch(console.error);
  }, [state]);

  const onSearch = () => {
    if (state && city) {
      navigate(`/results?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <div className="search-grid">
      {/* 👇 these wrapper IDs are what the tests expect */}
      <div id="state">
        <label htmlFor="stateSelect" className="sr-only">Select State</label>
        <select
          id="stateSelect"
          value={state}
          onChange={e => setState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div id="city">
        <label htmlFor="citySelect" className="sr-only">Select City</label>
        <select
          id="citySelect"
          value={city}
          onChange={e => setCity(e.target.value)}
          disabled={!state}
        >
          <option value="">Select City</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button id="searchBtn" onClick={onSearch}>Search</button>
    </div>
  );
}