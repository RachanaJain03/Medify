import { useEffect, useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings = [], dispatch } = useBookings(); // your context
  const [persisted, setPersisted] = useState([]);

  // Load persisted bookings once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
      setPersisted(Array.isArray(saved) ? saved : []);
    } catch {
      setPersisted([]);
    }
  }, []);

  // Source of truth for rendering: prefer persisted (for Cypress reload test)
  const list = persisted.length ? persisted : bookings;

  const cancel = (id) => {
    // Update context (if your reducer handles REMOVE)
    dispatch({ type: "REMOVE", id });

    // Update localStorage copy
    const next = (persisted.length ? persisted : bookings).filter(b => b.id !== id);
    setPersisted(next); // keep UI in sync
    localStorage.setItem("bookings", JSON.stringify(next));
  };

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h1>My Bookings</h1>

      {list.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        list.map((b) => {
          // Be flexible with field names; tests expect lowercase in <h3>
          const name =
            (b.hospitalName || b.centerName || b.name || "").toLowerCase();
          const city = b.city || "";
          const state = b.state || "";
          const date = b.date || b.dateISO || "";
          const time = b.time || "";

          return (
            <div key={b.id || `${name}-${date}-${time}`} className="card" style={{ marginBottom: 12 }}>
              <h3>{name}</h3>
              {(city || state) && <p>{[city, state].filter(Boolean).join(", ")}</p>}
              {(date || time) && <p>{[date, time].filter(Boolean).join(" • ")}</p>}
              {b.id && (
                <button onClick={() => cancel(b.id)} className="btn">Cancel</button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}