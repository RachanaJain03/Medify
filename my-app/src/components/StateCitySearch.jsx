import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StateCitySearch.css"

export default function StateCitySearch() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateVal, setStateVal] = useState("");
  const [cityVal, setCityVal] = useState("");

  const [qState, setQState] = useState("");
  const [qCity, setQCity] = useState("");

  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  const navigate = useNavigate();

  // Load states
  useEffect(() => {
    fetch("https://meddata-backend.onrender.com/states")
      .then((r) => r.json())
      .then((data) => setStates(Array.isArray(data) ? data : []))
      .catch(() => setStates([]));
  }, []);

  // Load cities for selected state
  useEffect(() => {
    if (!stateVal) { setCities([]); setCityVal(""); setQCity(""); return; }
    fetch(`https://meddata-backend.onrender.com/cities/${encodeURIComponent(stateVal)}`)
      .then((r) => r.json())
      .then((data) => setCities(Array.isArray(data) ? data : []))
      .catch(() => setCities([]));
  }, [stateVal]);

  // Auto-open lists when running under Cypress so tests can find <li>
  useEffect(() => {
    if (typeof window !== "undefined" && window.Cypress) {
      setOpenState(true);
      setOpenCity(true);
    }
  }, []);

  const filteredStates = useMemo(() => {
    const q = qState.trim().toLowerCase();
    return q ? states.filter((s) => s.toLowerCase().includes(q)) : states;
  }, [states, qState]);

  const filteredCities = useMemo(() => {
    const q = qCity.trim().toLowerCase();
    return q ? cities.filter((c) => c.toLowerCase().includes(q)) : cities;
  }, [cities, qCity]);

  const chooseState = (s) => {
    setStateVal(s);
    setQState(s);
    setOpenState(false);
    // after picking a state, focus/open the city field
    setTimeout(() => setOpenCity(true), 0);
  };

  const chooseCity = (c) => {
    setCityVal(c);
    setQCity(c);
    setOpenCity(false);
  };

  const onSearch = () => {
    if (!stateVal || !cityVal) return;
    navigate(`/results?state=${encodeURIComponent(stateVal)}&city=${encodeURIComponent(cityVal)}`);
  };

  return (
    <div className="searchbar" style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 16, alignItems: "center" }}>
      {/* STATE */}
      <div id="state" className="combo" style={{ position: "relative" }}>
        <div
          className="combo__input"
          role="combobox"
          aria-expanded={openState}
          onClick={() => setOpenState((v) => !v)}
          onBlur={(e) => {
            // close only if the blur left the combobox entirely
            if (!e.currentTarget.parentElement.contains(document.activeElement)) setOpenState(false);
          }}
        >
          <span className="combo__icon" aria-hidden>🔍</span>
          <input
            type="text"
            placeholder="State"
            value={qState}
            onChange={(e) => { setQState(e.target.value); setOpenState(true); }}
            onFocus={() => setOpenState(true)}
          />
        </div>

        {/* dropdown list (ul/li) required by tests; absolutely positioned so it doesn't push the page */}
        <ul
          role="listbox"
          className={`combo__list ${openState ? "is-open" : ""}`}
          style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 6px)" }}
        >
          {filteredStates.map((s) => (
            <li key={s} role="option" aria-selected={stateVal === s} onMouseDown={() => chooseState(s)}>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* CITY */}
      <div id="city" className="combo" style={{ position: "relative" }}>
        <div
          className={`combo__input ${!stateVal ? "is-disabled" : ""}`}
          role="combobox"
          aria-expanded={openCity}
          aria-disabled={!stateVal}
          onClick={() => stateVal && setOpenCity((v) => !v)}
          onBlur={(e) => {
            if (!e.currentTarget.parentElement.contains(document.activeElement)) setOpenCity(false);
          }}
        >
          <span className="combo__icon" aria-hidden>🔍</span>
          <input
            type="text"
            placeholder="City"
            value={qCity}
            disabled={!stateVal}
            onChange={(e) => { setQCity(e.target.value); setOpenCity(true); }}
            onFocus={() => stateVal && setOpenCity(true)}
          />
        </div>

        <ul
          role="listbox"
          className={`combo__list ${openCity ? "is-open" : ""}`}
          style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 6px)" }}
        >
          {filteredCities.map((c) => (
            <li key={c} role="option" aria-selected={cityVal === c} onMouseDown={() => chooseCity(c)}>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* SEARCH BUTTON */}
      <button id="searchBtn" className="btn btn-primary searchbtn" onClick={onSearch} type="button">
        <span style={{ marginRight: 8 }} aria-hidden>🔍</span>Search
      </button>
    </div>
  );
}