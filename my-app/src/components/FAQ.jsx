import { useState } from "react";

export default function FAQ({ items = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="card">
      {items.map((it, i) => (
        <div key={i} style={{borderTop: i? "1px solid var(--line)": "none", padding:"12px 0"}}>
          <button
            onClick={() => setOpen(open===i? null : i)}
            style={{all:"unset", cursor:"pointer", display:"flex", justifyContent:"space-between", width:"100%", fontWeight:700}}
            aria-expanded={open===i}
          >
            {it.q}
            <span>{open===i ? "−" : "+"}</span>
          </button>
          {open===i && <p style={{color:"var(--muted)", margin:"8px 0 0"}}>{it.a}</p>}
        </div>
      ))}
    </div>
  );
}