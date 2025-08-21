import { useEffect, useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings = [], dispatch } = useBookings();
  const [persisted, setPersisted] = useState([]);

  // Load persisted bookings once (Cypress seeds localStorage directly)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
      setPersisted(Array.isArray(saved) ? saved : []);
    } catch {
      setPersisted([]);
    }
  }, []);

  // Prefer persisted for rendering so reload shows items
  const list = persisted.length ? persisted : bookings;

  const cancel = (id, index) => {
    // Update context if your reducer supports REMOVE
    if (id) dispatch({ type: "REMOVE", id });

    // Update localStorage + local state (handle items without id)
    const base = persisted.length ? persisted : bookings;
    const next = base.filter((b, i) => (b.id ? b.id !== id : i !== index));
    setPersisted(next);
    localStorage.setItem("bookings", JSON.stringify(next));
  };

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h1>My Bookings</h1>

      {list.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        list.map((b, i) => {
          // ✅ Support both your app's shape and the Cypress-seeded shape
          const name = (
            b.hospitalName ||
            b.centerName ||
            b.name ||
            b["Hospital Name"] ||
            ""
          ).toLowerCase();

          const city  = b.city  || b.City  || "";
          const state = b.state || b.State || "";
          const date  = b.date || b.dateISO || b.bookingDate || "";
          const time  = b.time || b.bookingTime || "";

          const key = b.id || `${name}-${date}-${time}-${i}`;

          return (
            <div key={key} className="card" style={{ marginBottom: 12 }}>
              <h3>{name}</h3>
              {(city || state) && <p>{[city, state].filter(Boolean).join(", ")}</p>}
              {(date || time) && <p>{[date, time].filter(Boolean).join(" • ")}</p>}
              {b.id && (
                <button onClick={() => cancel(b.id, i)} className="btn">Cancel</button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}