import { BASE_SLOTS, isSlotBooked} from "../utils/dates";

export default function TimeSlots({ bookings, centerId, dateObj, onPick}){
    if(!dateObj) return <p>Select a date</p>
    return(
        <div className="slots">
            {BASE_SLOTS.map((t) => {
                const disabled = isSlotBooked(bookings, centerId, dateObj, t);
                return(
                    <button key={t} disabled={disabled} onClick={() => onPick(t)}>
                      {t}{disabled ? " (Booked)" : ""}
                    </button>
                )
            })}
        </div>
    )
}