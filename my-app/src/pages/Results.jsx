import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getCenters } from "../api/index";
import CenterCard from "../components/CenterCard";

export default function Results() {
  const [params] = useSearchParams();
  const stateCode = params.get("state");
  const city = params.get("city");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stateCode || !city) return;
    setLoading(true);
    getCenters(stateCode, city)
      .then(({ data }) => setCenters(data || []))
      .catch(() => setCenters([]))
      .finally(() => setLoading(false));
  }, [stateCode, city]);

  if (!stateCode || !city) return <p>Invalid search.</p>;
  if (loading) return <p>Loading centers…</p>;
  if (!centers.length) return <p>No medical centers found.</p>;

  return (
    <div className="container" style={{paddingTop:24}}>
      {centers.map((c) => (
        <CenterCard key={c._id || c.id} center={c}>
          <Link to={`/booking/${c._id || c.id}`} state={{ center: c }} className="btn btn-primary">
            Book Appointment
          </Link>
        </CenterCard>
      ))}
    </div>
  );
}