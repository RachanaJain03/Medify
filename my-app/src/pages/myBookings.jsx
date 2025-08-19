import { useBookings } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings = [], dispatch } = useBookings();
  const cancel = (id) => dispatch({ type: "REMOVE", id });

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map(b => (
          <div key={b.id} className="card" style={{ marginBottom: 12 }}>
            <h3>{b.centerName}</h3>
            <p>{b.city}, {b.state}</p>
            <p>{b.dateISO} • {b.time}</p>
            <button onClick={() => cancel(b.id)} className="btn">Cancel</button>
          </div>
        ))
      )}
    </div>
  );
}