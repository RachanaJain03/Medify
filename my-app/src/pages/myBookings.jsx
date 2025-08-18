import { useBookings } from "../context/BookingContext";

export default function MyBookings() {
  const { bookings, dispatch } = useBookings();

  const cancel = (id) => dispatch({ type: "REMOVE", id });

  if (!bookings.length) return <p>No bookings yet.</p>;

  return (
    <div className="bookings">
      {bookings.map((b) => (
        <div key={b.id} className="booking-card">
          <h4>{b.centerName}</h4>
          <p>{b.city}, {b.state}</p>
          <p>{b.dateISO} • {b.time}</p>
          <button onClick={() => cancel(b.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}