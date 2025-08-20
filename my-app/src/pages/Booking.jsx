import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { formatISO } from "date-fns";
import TimeSlots from "../components/TimeSlots";
import { useBookings } from "../context/BookingContext";

function normalizeCenter(raw, fallbackId) {
  if (!raw) return { id: fallbackId, name: "Medical Center", city: "", state: "" };
  return {
    id: raw._id ?? raw.id ?? fallbackId,
    name: raw.name ?? raw["Hospital Name"] ?? "Medical Center",
    city: raw.city ?? raw.City ?? "",
    state: raw.state ?? raw.State ?? "",
  };
}
const saveBooking = (booking) => {
  const key = "bookings";
  const prev = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([booking, ...prev]));
};
function getNextDays(n = 7) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d,
      key: d.toISOString().slice(0, 10),
      label: i === 0
        ? "Today"
        : d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
    };
  });
}

export default function Booking() {
  const { centerId } = useParams();
  const { state } = useLocation();        // location.state
  const navigate = useNavigate();
  const { bookings, dispatch } = useBookings();

  const center = useMemo(() => normalizeCenter(state?.center, centerId), [state, centerId]);

  const [dateObj, setDateObj] = useState(null);
  const [time, setTime] = useState("");

  const days = useMemo(() => getNextDays(7), []);

  const confirm = () => {
    if (!dateObj || !time) return alert("Pick a date and time");

    const booking = {
      id: crypto.randomUUID(),
      centerId: center.id,
      centerName: center.name,
      state: center.state,
      city: center.city,
      dateISO: formatISO(dateObj, { representation: "date" }),
      time,
    };
    dispatch({ type: "ADD", payload: booking });
    navigate("/my-bookings"); // <- plural
  };

  return (
    <div className="container" style={{ paddingTop: 24 }} data-cy="booking-page">
      <h1>Book Appointment</h1>
      <h2 style={{ marginTop: 6 }}>Center: {center.name}</h2>

      {/* Inline 7-day picker */}
      <div className="week-grid" data-cy="week-grid" style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        {days.map((d) => {
          const active = dateObj && d.key === dateObj.toISOString().slice(0, 10);
          return (
            <button
              key={d.key}
              type="button"
              data-cy="day-btn"
              className={`btn ${active ? "btn-primary" : ""}`}
              onClick={() => setDateObj(d.date)}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      {/* Time slots for selected day */}
      <TimeSlots
        bookings={bookings}
        centerId={center.id}
        dateObj={dateObj}
        onPick={setTime}
      />

      <p>
        Selected:&nbsp;
        {dateObj && time ? `${dateObj.toDateString()} at ${time}` : "None"}
      </p>

      <button
        className="btn btn-primary"
        data-cy="confirm-btn"
        onClick={confirm}
        disabled={!dateObj || !time}
      >
        Confirm Booking
      </button>
    </div>
  );
}