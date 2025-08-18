import  getNextDays from "../utils/dates"
import { format } from "date-fns";

export default function WeekCalender({ selected, onSelect}){
    const days = getNextDays();

    return (
        <div className="week-grid">
            {days.map((d) => {
                const isActive = selected && +d === +selected;
                return(
                    <button
                      key={+d}
                      className={isActive ? "day active" : "day"}
                      onClick={()=> onSelect(d)}>
                        <div>{format(d, "EEE")}</div>
                        <div>{format(d, "dd LLL")}</div>
                      </button>
                )
            })}
        </div>
    )
}