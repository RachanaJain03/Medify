import { Link } from "react-router-dom";

export default function CenterCard({ center = {}, children }) {
  if (!center) return null; // defensive

  // read common fields safely (API fields vary)
  const id    = center._id ?? center.id ?? center.hospital_id ?? null;
  const name  = center.name ?? center["Hospital Name"] ?? center["HospitalName"] ?? "Medical Center";
  const city  = center.city ?? center.City ?? "";
  const state = center.state ?? center.State ?? "";
  const address = center.address ?? center.Address ?? "";
  const phone = center.phone ?? center.Phone ?? "";
  const imageUrl = center.imageUrl;

  return (
    <article className="center-card">
      <img
        className="center-card__img"
        src={imageUrl || "https://via.placeholder.com/96x96?text=Clinic"}
        alt={name}
        loading="lazy"
      />

      <div className="center-card__body">
        <h3 className="center-card__name">{name}</h3>

        {(city || state) && (
          <p className="center-card__addr">
            {address && `${address}, `}{city}{city && state ? ", " : ""}{state}
          </p>
        )}

        <div className="center-card__actions">
          {children ? (
            children
          ) : (
            // if you don't want navigation yet, replace Link with a button
            <Link to={`/booking/${id ?? ""}`} state={{ center }} className="btn btn-primary">
              Book Appointment
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}