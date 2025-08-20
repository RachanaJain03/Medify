import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"


export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${elevated ? "navbar--elevated" : ""}`}>
      <div className="navbar__notice">
        The health and well-being of our patients and their health care team will always be our priority,
        so we follow the best practices for cleanliness.
      </div>

      <div className="navbar__row container">
        <Link to="/" className="nav__logo" onClick={close}>
          <span className="logo-badge" aria-hidden="true">🛡️</span>
          <span className="logo-text">Medify</span>
        </Link>

        {/* desktop menu */}
        <nav className="nav__menu" aria-label="primary">
          <NavLink to="/" end className="nav__link" onClick={close}>Find Doctors</NavLink>
          {/* hash anchors: use a plain <a> so the hash works reliably */}
          <a href="/#search" className="nav__link" onClick={close}>Hospitals</a>
          <button type="button" className="nav__link" onClick={close}>Medicines</button>
          <button type="button" className="nav__link" onClick={close}>Surgeries</button>
          <button type="button" className="nav__link" onClick={close}>Software for Provider</button>
          <button type="button" className="nav__link" onClick={close}>Facilities</button>
        </nav>

        <Link to="/my-bookings" className="nav__cta" onClick={close}>My Bookings</Link>

        {/* hamburger (mobile only via CSS) */}
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span/><span/><span/>
        </button>
      </div>

      {/* mobile panel */}
      <nav className={`nav__panel ${open ? "is-open" : ""}`} aria-label="mobile">
        <NavLink to="/" end className="nav__plink" onClick={close}>Find Doctors</NavLink>
        <a href="/#search" className="nav__plink" onClick={close}>Hospitals</a>
        <button type="button" className="nav__plink" onClick={close}>Medicines</button>
        <button type="button" className="nav__plink" onClick={close}>Surgeries</button>
        <button type="button" className="nav__plink" onClick={close}>Software for Provider</button>
        <button type="button" className="nav__plink" onClick={close}>Facilities</button>
        <Link to="/my-bookings" className="nav__plink nav__plink--cta" onClick={close}>My Bookings</Link>
      </nav>
    </header>
  );
}