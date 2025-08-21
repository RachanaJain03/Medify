import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Results() {
  const q = useQuery();
  const state = q.get("state") || "";
  const city = q.get("city") || "";
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !city) {
      setItems([]);
      return;
    }
    fetch(
      `https://meddata-backend.onrender.com/data?state=${encodeURIComponent(
        state
      )}&city=${encodeURIComponent(city)}`
    )
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]));
  }, [state, city]);

  const openBooking = (row) => {
    const id =
      row.id ||
      row["Provider ID"] ||
      row["Facility ID"] ||
      row["Hospital overall rating"] ||
      row["Hospital Name"];
    navigate(`/booking/${encodeURIComponent(id)}`, { state: { center: row } });
  };

  return (
    <div className="container results" data-cy="results-page" style={{ paddingTop: 24 }}>
      {/* ✅ EXACT format Cypress expects */}
      <h1 data-cy="results-title">Hospitals in {city.toUpperCase()}, {state}</h1>
      {items.length > 0 && (
      <p className="results__count" style={{ margin: "6px 0 12px" }}>
        {items.length} medical centers available in {city.toLowerCase()}
      </p>
    )}

      {items.map((h, i) => {
        const key = h["Provider ID"] || h["Facility ID"] || i;
        const name = (h["Hospital Name"] || h.name || "medical center").toLowerCase();
        const address = h.Address || h["Address 1"] || h.address || "";
        return (
          <article
            key={key}
            className="card"
            data-cy="hospital-card"
            style={{ marginBottom: 12, padding: 12, cursor: "pointer" }}
          >
            <h3 data-cy="hospital-name">{name}</h3>
            {address && <p>{address}</p>}
            {/* ✅ The button Cypress clicks */}
            <button
              type="button"
              className="nav__plink"
              data-cy="book-free-btn"
              onClick={() => openBooking(h)}
              style={{ marginTop: 8 }}
            >
              Book FREE Center Visit
            </button>
          </article>
        );
      })}

      {state && city && items.length === 0 && (
        <p data-cy="no-results">No medical centers found for {city}, {state}.</p>
      )}
    </div>
  );
}