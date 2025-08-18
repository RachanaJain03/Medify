import { addDays, formatISO, isSameDay, startOfDay } from "date-fns";

export default function getNext7Days(){
    const today = startOfDay(new Date())
    return Array.from({ length: 7}, (_, i) => addDays(today, i))
}

export const BASE_SLOTS = [
    "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30",
  "15:00", "15:30", "16:00"
];

export const keyFor= (centerId, d, time) => `${centerId}_${formatISO(d, { representation: "date"})}_${time}`

export function isSlotBooked(bookings, centerId, dateObj, time){
    return bookings.some(
        (b) => b.centerId === centerId &&
        isSameDay(new Date(b.dateISO), dateObj) && 
        b.time === time
    )
}