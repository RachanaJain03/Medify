import { Link } from "react-router-dom";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
       <rect width='100%' height='100%' rx='8' fill='#e2e8f0'/>
       <text x='50%' y='52%' text-anchor='middle' font-size='12' fill='#64748b' font-family='Arial, sans-serif'>Clinic</text>
     </svg>`
  );

export default function CenterCard({ center = {}, children }) {
  const id    = center._id ?? center.id ?? null;
  const name  = center.name ?? center["Hospital Name"] ?? "Medical Center";
  const city  = center.city ?? center.City ?? "";
  const state = center.state ?? center.State ?? "";
  const address = center.address ?? center.Address ?? "";
  const imageUrl = center.imageUrl;

  return (
    <article className="center-card">
      <img
        className="center-card__img"
        src={imageUrl || FALLBACK_IMG}
        alt={name}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
      />

      <div className="center-card__body">
        <h3 className="center-card__name">{name}</h3>
        {(city || state || address) && (
          <p className="center-card__addr">
            {[address, city, state].filter(Boolean).join(", ")}
          </p>
        )}

        <div className="center-card__actions">
          <span data-cy="book-cta">{children}</span>
        </div>
      </div>
    </article>
  );
}