import { useLocation, useParams, useNavigate} from "react-router-dom"
import { useState } from "react"
import { formatISO } from "date-fns"
import WeekCalender from "../components/weekCalender"
import TimeSlots from "../components/TimeSlots"
import { useBookings } from "../context/BookingContext"


export default function Booking(){
    const { centerId }= useParams();
    const { state } = useLocation();
    const navigate = useNavigate()
    const { bookings, dispatch} =useBookings()

    const center = state?.center || { id: centerId, name: "Medical Center"}
    const [dateObj, setDateObj] = useState(null);
    const [time, setTime] = useState("");

    const confirm = () => {
        if(!dateObj || !time) return alert("Pick a date and time");

        const booking = {
            id: crypto.randomUUID(),
            centerId: center.id,
            centerName: center.name,
            state: center.state,
            city: center.city,
            dateISO: formatISO(dateObj, {representation: "date"}),
            time,
        }
      dispatch({ type: "ADD", payload: booking});
      navigate("/my-booking")
    }
    return(
        <div>
            <h2>Book: {center.name}</h2>
            <WeekCalender selected={dateObj} onSelect={setDateObj}/>
            <TimeSlots
              bookings={bookings}
              centerId={center.id}
              dateObj={dateObj}
              onPick={setTime}/>
              <p>Selected: {dateObj ? bookingLabel(dateObj, time) : "None"}</p>
              <button onClick={confirm}>Confirm Booking</button>
        </div>
    )
}
function bookingLabel(dateObj, time){
    if(!dateObj || !time) return "";
    return `${dateObj.toDateString()} at ${time}`
}