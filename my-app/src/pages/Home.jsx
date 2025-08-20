import StateCitySearch from "../components/StateCitySearch";
import SectionTitle from "../components/SectionStyles";   // make sure the file is SectionTitle.jsx
import FAQ from "../components/FAQ";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css"
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      {/* HERO (includes the search card) */}
      <Hero />

      {/* Remove this block if your <Hero /> already shows the search. If you keep it, you’ll have two search bars. */}
      {false && (
        <section className="section section--alt" style={{ paddingTop: 28, paddingBottom: 28 }}>
          <div className="container">
            <div className="card" style={{ display: "grid", gap: 16 }}>
              <SectionTitle
                eyebrow="Best healthcare near you"
                title="Find Medical Centers"
                subtitle="Search by state and city to discover centers and book an appointment."
                align="left"
              />
              <StateCitySearch />
            </div>
          </div>
        </section>
      )}

      {/* Find by Specialization */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Find by Specialization" title="Browse top specialties" />
          <div className="grid grid-4">
            {["Cardiology","Dermatology","Dentistry","Neurology","Orthopedics","Pediatrics","ENT","General"].map((s) => (
              <div className="card" key={s} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, margin: "0 auto 8px", borderRadius: 12, background: "#eef2ff" }} />
                <div style={{ fontWeight: 700 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Medical Specialist (Swiper) */}
      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="Our Medical Specialist" title="Trusted doctors" />
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#e2e8f0" }} />
                  <div>
                    <div style={{ fontWeight: 800 }}>Dr. Jane Doe</div>
                    <div style={{ color: "var(--muted)" }}>Cardiologist • 10 yrs exp.</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Feature strip */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
            <div style={{ height: 140, borderRadius: 12, background: "#e2e8f0" }} />
            <div>
              <h3 style={{ marginTop: 0 }}>Patient Caring</h3>
              <p style={{ color: "var(--muted)" }}>
                Compassionate care and modern facilities to make your visit comfortable.
              </p>
              <button className="btn btn-primary">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="Read Our Latest News" title="Health tips & updates" />
          <div className="grid grid-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article className="card" key={i}>
                <div style={{ height: 140, borderRadius: 8, background: "#e2e8f0", marginBottom: 10 }} />
                <h4 style={{ margin: "0 0 6px" }}>Healthy Heart Habits</h4>
                <p style={{ color: "var(--muted)", margin: 0 }}>Simple lifestyle changes for a stronger heart.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", textAlign: "center", gap: 12 }}>
            {[
              ["Our Families", "50K+"],
              ["Qualified Doctors", "500+"],
              ["Hospitals", "200+"],
              ["Cities Covered", "100+"],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>{value}</div>
                <div style={{ color: "var(--muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="Frequently Asked Questions" title="Need help?" />
          <FAQ
            items={[
              { q: "How do I book an appointment?", a: "Search by state and city, pick a center, then choose a date and time." },
              { q: "Can I reschedule?", a: "Yes. Cancel in My Bookings and book a new slot." },
              { q: "How far in advance?", a: "You can book up to 7 days ahead." },
            ]}
          />
        </div>
      </section>

      {/* App download CTA */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, alignItems: "center" }}>
            <div style={{ height: 160, borderRadius: 12, background: "#e2e8f0" }} />
            <div>
              <h3 style={{ marginTop: 0 }}>Download the Medify App</h3>
              <p style={{ color: "var(--muted)" }}>Book appointments on the go. Available on iOS & Android.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-primary">App Store</button>
                <button className="btn">Google Play</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section section--alt">
        <div className="container">
          <div className="grid grid-4">
            <div><h4>Medify</h4><p style={{ color: "var(--muted)" }}>Quality healthcare, simplified.</p></div>
            <div><h4>Company</h4><ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--muted)" }}><li>About</li><li>Careers</li></ul></div>
            <div><h4>Support</h4><ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--muted)" }}><li>Help Center</li><li>Contact</li></ul></div>
            <div><h4>Legal</h4><ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--muted)" }}><li>Privacy</li><li>Terms</li></ul></div>
          </div>
          <p style={{ color: "var(--muted)", marginTop: 16 }}>&copy; {new Date().getFullYear()} Medify</p>
        </div>
      </footer>
    </main>
  );
}