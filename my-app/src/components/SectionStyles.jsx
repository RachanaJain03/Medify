export default function SectionTitle({ eyebrow, title, subtitle, align="center" }) {
  return (
    <div style={{textAlign:align, marginBottom:24}}>
      {eyebrow && <div className="badge" style={{marginBottom:8}}>{eyebrow}</div>}
      {title && <h2 style={{margin:0, fontSize:"1.6rem"}}>{title}</h2>}
      {subtitle && <p style={{margin:"8px 0 0", color:"var(--muted)"}}>{subtitle}</p>}
    </div>
  );
}