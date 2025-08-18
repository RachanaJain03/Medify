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
  const keyFor = (c, i) => {
  const name  = (c.name || c["Hospital Name"] || "").trim();
  const city  = (c.city || c.City || "").trim();
  const state = (c.state || c.State || "").trim();
  return c._id || c.id || `${state}-${city}-${name}-${i}`;
};


  return (
    <div className="container" style={{ paddingTop: 24 }}>
    <h2 style={{ marginTop: 0 }}>
      Results in {city}, {stateCode} ({centers.length})
    </h2>

    {centers.map((c, i) => {
      const k = keyFor(c, i);
      return (
        <CenterCard key={k} center={c}>
          <Link
            to={`/booking/${encodeURIComponent(k)}`}
            state={{ center: c }}
            className="btn btn-primary"
          >
            Book Appointment
          </Link>
        </CenterCard>
      );
    })}
  </div>
  );
}