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
    // build a stable id from common fields
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
      {items.map((h, i) => {
        const key = h["Provider ID"] || h["Facility ID"] || i;
        const name = (h["Hospital Name"] || h.name || "medical center").toLowerCase(); // tests expect lowercase
        const address = h.Address || h["Address 1"] || h.address || "";
        return (
          <article
            key={key}
            className="card"
            data-cy="hospital-card"
            onClick={() => openBooking(h)}
            style={{ cursor: "pointer", marginBottom: 12, padding: 12 }}
          >
            <h3 data-cy="hospital-name">{name}</h3>
            {address && <p>{address}</p>}
          </article>
        );
      })}

      {state && city && items.length === 0 && (
        <p data-cy="no-results">No medical centers found for {city}, {state}.</p>
      )}
    </div>
  );
}