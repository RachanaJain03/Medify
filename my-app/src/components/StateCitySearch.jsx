// src/components/StateCitySearch.jsx
import { useEffect, useState } from "react";
// if your api file is "src/api/index.jsx", import with that exact path
import { getStates, getCities } from "../api/index"; 

import { useNavigate } from "react-router-dom";

export default function StateCitySearch() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingStates(true);
    getStates()
      .then(({ data }) => setStates(data || []))
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (!stateCode) {
      setCities([]);
      setCity("");
      return;
    }
    setLoadingCities(true);
    getCities(stateCode)
      .then(({ data }) => setCities(data || []))
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [stateCode]);

  const onSearch = () => {
    if (!stateCode || !city) {
      alert("Please select both state and city");
      return;
    }
    navigate(`/results?state=${encodeURIComponent(stateCode)}&city=${encodeURIComponent(city)}`);
  };

  // handle both strings and objects (if API returns objects)
  const readState = (s) => (typeof s === "string" ? s : s?.state || s?.code || s?.name || "");
  const readCity  = (c) => (typeof c === "string" ? c : c?.city || c?.name || "");

  return (
    <div className="search-bar" style={{display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:12}}>
      <select
        value={stateCode}
        onChange={(e) => setStateCode(e.target.value)}
        disabled={loadingStates}
      >
        <option value="">{loadingStates ? "Loading states..." : "Select State"}</option>
        {states.map((s) => {
          const val = readState(s);
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </select>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={!stateCode || loadingCities}
      >
        <option value="">{loadingCities ? "Loading cities..." : "Select City"}</option>
        {cities.map((c) => {
          const val = readCity(c);
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </select>

      <button className="btn btn-primary" onClick={onSearch}>Search</button>
    </div>
  );
}