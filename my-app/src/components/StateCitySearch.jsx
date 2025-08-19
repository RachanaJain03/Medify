import { useEffect, useState } from "react";
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
      .then(({ data }) => setStates(Array.isArray(data) ? data : []))
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (!stateCode) { setCities([]); setCity(""); return; }
    setLoadingCities(true);
    getCities(stateCode)
      .then(({ data }) => setCities(Array.isArray(data) ? data : []))
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [stateCode]);

  const onSearch = () => {
    if (!stateCode || !city) return alert("Please select both state and city");
    navigate(`/results?state=${encodeURIComponent(stateCode)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch(); }}
      className="search-bar"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12 }}
    >
      <div className="field">
        <label htmlFor="state">State</label>
        <select
          id="state"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          disabled={loadingStates}
        >
          <option value="">{loadingStates ? "Loading states..." : "Select State"}</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="city">City</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!stateCode || loadingCities}
        >
          <option value="">{loadingCities ? "Loading cities..." : "Select City"}</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button id="searchBtn" type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}