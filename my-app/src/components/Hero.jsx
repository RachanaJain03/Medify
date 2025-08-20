import StateCitySearch from "./StateCitySearch";
//import heroImg from "../assets/hero.jpg";

const CATS = [
    { icon: "👨‍⚕️", label: "Doctors" },
  { icon: "🧪",     label: "Labs" },
  { icon: "🏥",     label: "Hospitals" },
  { icon: "💊",     label: "Medical Store" },
  { icon: "🚑",     label: "Ambulance" },
];

export default function Hero(){
    return (
    <section className="hero">
      {/* thin top strip */}

      <div className="container">
        <div className="hero__grid">
          {/* left copy */}
          <div className="hero__copy">
            <div className="hero__brand">Medify</div>

            <h1 className="hero__title">
              Skip the travel! Find Online<br />
              <span className="hero__title-accent">Medical Centers</span>
            </h1>

            <p className="hero__sub">
              Connect instantly with a 24×7 specialist or choose to video visit a particular doctor.
            </p>

            <a href="/#search" className="btn btn-primary hero__cta">Find Centers</a>
          </div>

          {/* right art */}
          <div className="hero__art">
            {/* Put an image named /hero-doctors.png in /public.
               We hide it gracefully if it’s missing. */}
            <img
              src= "/hero.jpg"
              alt=""
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="hero__circle" aria-hidden="true" />
          </div>
        </div>

        {/* overlapping search card */}
        <div className="hero__search card" id="search">
          <StateCitySearch />
        </div>

        {/* quick categories */}
        <div className="hero__cats">
          <h5 className="hero__cats-title">You may be looking for</h5>
          <div className="hero__cats-grid">
            {CATS.map(({ icon, label }) => (
              <div key={label} className="hero__cat card">
                <div className="hero__cat-icon" aria-hidden="true">{icon}</div>
                <div className="hero__cat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
  
