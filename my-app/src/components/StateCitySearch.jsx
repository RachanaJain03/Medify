import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StateCitySearch() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  // load states once
  useEffect(() => {
    fetch("https://meddata-backend.onrender.com/states")
      .then((r) => r.json())
      .then((data) => setStates(Array.isArray(data) ? data : []))
      .catch(() => setStates([]));
  }, []);

  // load cities when a state is chosen
  useEffect(() => {
    if (!selectedState) { setCities([]); setSelectedCity(""); return; }
    fetch(`https://meddata-backend.onrender.com/cities/${encodeURIComponent(selectedState)}`)
      .then((r) => r.json())
      .then((data) => setCities(Array.isArray(data) ? data : []))
      .catch(() => setCities([]));
  }, [selectedState]);

  const onSearch = () => {
    if (!selectedState || !selectedCity) return;
    navigate(
      `/results?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`
    );
  };

  return (
    <div className="search-grid" style={{ display: "grid", gap: 12 }}>
      {/* These wrapper IDs are what the tests target */}
      <div id="state">
        <h6 style={{ margin: 0 }}>State</h6>
        <ul role="listbox" aria-label="States"
            style={{ margin: "8px 0", padding: 0, maxHeight: 220, overflow: "auto" }}>
          {states.map((s) => (
            <li key={s}
                onClick={() => setSelectedState(s)}
                style={{ listStyle: "none", padding: "6px 8px", cursor: "pointer", borderBottom: "1px solid #eef3ff" }}>
              {s}
            </li>
          ))}
        </ul>
        {selectedState && <small>Selected: {selectedState}</small>}
      </div>

      <div id="city">
        <h6 style={{ margin: 0 }}>City</h6>
        <ul role="listbox" aria-label="Cities"
            style={{ margin: "8px 0", padding: 0, maxHeight: 220, overflow: "auto" }}>
          {cities.map((c) => (
            <li key={c}
                onClick={() => setSelectedCity(c)}
                style={{ listStyle: "none", padding: "6px 8px", cursor: "pointer", borderBottom: "1px solid #eef3ff" }}>
              {c}
            </li>
          ))}
        </ul>
        {selectedCity && <small>Selected: {selectedCity}</small>}
      </div>

      <button id="searchBtn" className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}