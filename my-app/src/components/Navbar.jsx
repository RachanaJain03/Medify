import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
    <header className={`nav ${elevated ? "nav--elevated" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={close}>
          <img src="/logo.svg" alt="Medify" onError={(e)=>{e.currentTarget.style.display='none'}} />
          <span>Medify</span>
        </Link>

        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span/><span/><span/>
        </button>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end className={({isActive}) => `nav__link ${isActive ? "active" : ""}`} onClick={close}>
            Find Doctors
          </NavLink>

          {/* Jump to the search section on Home so Results isn't opened empty */}
          <NavLink
            to="/#search"
            className={({isActive}) => `nav__link ${isActive ? "active" : ""}`}
            onClick={close}
          >
            Hospitals
          </NavLink>

          {/* Placeholder: use a button so it doesn't jump to top */}
          <button type="button" className="nav__link" onClick={close}>Medicines</button>

          <NavLink to="/my-bookings" className={({isActive}) => `nav__link ${isActive ? "active" : ""}`} onClick={close}>
            My Bookings
          </NavLink>

          <Link to="/my-bookings" className="btn btn-primary nav__cta" onClick={close}>
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}