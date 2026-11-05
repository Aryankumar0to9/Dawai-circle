import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, MapPin, ScanLine, Bookmark, BookmarkCheck, Plus, Minus, X,
  Navigation, Phone, Clock3, Pill, ShieldCheck, ArrowRight, ListChecks,
  HeartPulse, Info, Check, Menu
} from "lucide-react";
import "./styles.css";

const medicines = [
  { id: "m1", name: "Paracetamol", strength: "500 mg", form: "Tablet", composition: "Paracetamol", code: "JAK-001", price: 5.5, pack: "10 tablets", brand: "Dolo 650 / Crocin (strength differs)", category: "Pain & fever", description: "Used for relief of fever and mild to moderate pain. Follow your clinician's directions." },
  { id: "m2", name: "Metformin", strength: "500 mg", form: "Tablet", composition: "Metformin Hydrochloride", code: "JAK-014", price: 12, pack: "10 tablets", brand: "Glycomet (verify exact formulation)", category: "Diabetes", description: "A prescription medicine used in diabetes care. Confirm the exact formulation and dose with your clinician." },
  { id: "m3", name: "Amlodipine", strength: "5 mg", form: "Tablet", composition: "Amlodipine Besylate", code: "JAK-027", price: 8, pack: "10 tablets", brand: "Amlong (verify exact formulation)", category: "Heart & blood pressure", description: "A prescription medicine used to manage blood pressure. Do not change a prescribed medicine without professional advice." },
  { id: "m4", name: "Cetirizine", strength: "10 mg", form: "Tablet", composition: "Cetirizine Hydrochloride", code: "JAK-042", price: 4, pack: "10 tablets", brand: "Cetzine (verify exact formulation)", category: "Allergy", description: "An antihistamine used for allergy symptoms. It may cause drowsiness in some people." },
  { id: "m5", name: "Pantoprazole", strength: "40 mg", form: "Tablet", composition: "Pantoprazole", code: "JAK-063", price: 15, pack: "10 tablets", brand: "Pantocid (verify exact formulation)", category: "Digestive health", description: "A prescription medicine used for acid-related conditions. Confirm formulation and directions." },
  { id: "m6", name: "Atorvastatin", strength: "10 mg", form: "Tablet", composition: "Atorvastatin", code: "JAK-081", price: 14, pack: "10 tablets", brand: "Atorva (verify exact formulation)", category: "Cholesterol", description: "A prescription medicine used to manage cholesterol. Use only as prescribed." },
  { id: "m7", name: "Azithromycin", strength: "500 mg", form: "Tablet", composition: "Azithromycin", code: "JAK-106", price: 28, pack: "3 tablets", brand: "Azithral (verify exact formulation)", category: "Antibiotic", description: "An antibiotic. Use only when prescribed; do not self-medicate or stop early without medical advice." },
  { id: "m8", name: "ORS", strength: "WHO formula", form: "Powder", composition: "Oral Rehydration Salts", code: "JAK-119", price: 3, pack: "1 sachet", brand: "Electral (formulation may differ)", category: "Hydration", description: "Used to help replace fluids and electrolytes. Follow packet instructions." }
];

const kendras = [
  { id: "k1", name: "Jan Aushadhi Kendra — Dadri", address: "Near Main Market, Dadri, Uttar Pradesh", phone: "Phone not verified", distance: "Location needed", hours: "Hours not verified", status: "Call to confirm stock" },
  { id: "k2", name: "Jan Aushadhi Kendra — Noida", address: "Sector 18, Noida, Uttar Pradesh", phone: "Phone not verified", distance: "Location needed", hours: "Hours not verified", status: "Call to confirm stock" },
  { id: "k3", name: "Jan Aushadhi Kendra — Greater Noida", address: "Pari Chowk area, Greater Noida, Uttar Pradesh", phone: "Phone not verified", distance: "Location needed", hours: "Hours not verified", status: "Call to confirm stock" }
];

function App() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationText, setLocationText] = useState("");
  const [locationRequested, setLocationRequested] = useState(false);
  const [notice, setNotice] = useState("Demo catalogue — verify current prices and availability with the Kendra.");
  const [menuOpen, setMenuOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return medicines;
    return medicines.filter((m) =>
      [m.name, m.strength, m.form, m.composition, m.code, m.brand, m.category]
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [query]);

  const savedMedicines = medicines.filter((m) => saved.includes(m.id));
  const total = savedMedicines.reduce((sum, m) => sum + m.price, 0);

  const toggleSave = (id) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    setNotice(saved.includes(id) ? "Removed from your saved list." : "Added to your saved list.");
  };

  const useLocation = () => {
    if (!navigator.geolocation) {
      setNotice("This browser does not support location. Enter your city or PIN code instead.");
      return;
    }
    setLocationRequested(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationText(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        setNotice("Location received for this demo. Store results are sample listings, not live verified locations.");
      },
      () => setNotice("Location permission was not granted. You can search by city or PIN code."),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const shareList = () => {
    const text = `Please confirm availability and price for these Jan Aushadhi medicines:\n${savedMedicines.map((m) => `• ${m.name} ${m.strength} — ${m.pack}`).join("\n")}\nPlease confirm before I visit.`;
    if (navigator.share) navigator.share({ title: "Medicine list", text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => setNotice("Medicine list copied. Paste it into WhatsApp to ask a Kendra."));
    else setNotice(text);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("search"); }}>
          <span className="brand-mark"><HeartPulse size={22} strokeWidth={2.5} /></span>
          <span><strong>Dawai Circle</strong><small>Affordable medicine finder</small></span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <button className={activeTab === "search" ? "nav-link active" : "nav-link"} onClick={() => { setActiveTab("search"); setMenuOpen(false); }}>Find medicines</button>
          <button className={activeTab === "stores" ? "nav-link active" : "nav-link"} onClick={() => { setActiveTab("stores"); setMenuOpen(false); }}>Find a Kendra</button>
          <button className={activeTab === "saved" ? "nav-link active" : "nav-link"} onClick={() => { setActiveTab("saved"); setMenuOpen(false); }}>My list <span className="count">{saved.length}</span></button>
        </nav>
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21}/></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> A simpler way to find affordable medicines</div>
            <h1>Find your medicine.<br/><em>Find your Kendra.</em></h1>
            <p>Search Jan Aushadhi medicines, check listed prices, save your medicine list, and find a nearby store.</p>
            <div className="hero-trust"><ShieldCheck size={16}/> Informational tool · No medicine sales</div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-circle circle-one"></div><div className="art-circle circle-two"></div>
            <div className="medicine-box"><div className="box-cross">+</div><span>DAWAI CIRCLE</span><small>MEDICINE FINDER</small></div>
            <div className="floating-pill pill-one"><Pill size={17}/><span>Price lookup</span></div>
            <div className="floating-pill pill-two"><MapPin size={17}/><span>Nearby Kendras</span></div>
          </div>
        </section>

        <section className="search-panel">
          <div className="search-title"><div><span className="section-kicker">MEDICINE CATALOGUE</span><h2>What medicine are you looking for?</h2></div><button className="scan-button" onClick={() => setNotice("Prescription scanning is planned for a later version. For now, type the medicine name or composition.")}><ScanLine size={18}/> Scan prescription <span className="soon">Soon</span></button></div>
          <div className="search-box"><Search size={21}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search medicine, brand, salt or strength..." aria-label="Search medicine"/>{query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Clear search"><X size={18}/></button>}<button className="search-submit" onClick={() => setActiveTab("search")}>Search</button></div>
          <div className="popular-searches"><span>Popular:</span>{["Paracetamol", "Metformin", "Amlodipine", "ORS"].map((item) => <button key={item} onClick={() => { setQuery(item); setActiveTab("search"); }}>{item}</button>)}</div>
        </section>

        {notice && <div className="notice"><Info size={16}/><span>{notice}</span><button aria-label="Dismiss notice" onClick={() => setNotice("")}><X size={15}/></button></div>}

        {activeTab === "search" && (
          <section className="content-section">
            <div className="section-heading"><div><span className="section-kicker">SEARCH RESULTS</span><h2>{query ? `Results for “${query}”` : "Popular medicines"}</h2><p>{results.length} demo catalogue {results.length === 1 ? "match" : "matches"}</p></div><span className="data-label"><span className="status-dot"></span> Sample data</span></div>
            {results.length ? <div className="medicine-grid">{results.map((m) => <MedicineCard key={m.id} medicine={m} saved={saved.includes(m.id)} onSave={() => toggleSave(m.id)} onDetails={() => setSelected(m)}/>)}</div> : <div className="empty-state"><Search size={28}/><h3>No medicine found</h3><p>Try searching by generic name, strength, or composition.</p><button className="secondary-button" onClick={() => setQuery("")}>Show all medicines</button></div>}
          </section>
        )}

        {activeTab === "saved" && (
          <section className="content-section">
            <div className="section-heading"><div><span className="section-kicker">YOUR SHORTLIST</span><h2>My medicine list</h2><p>Save medicines here before visiting a Kendra.</p></div><span className="data-label">{saved.length} saved</span></div>
            {savedMedicines.length ? <><div className="saved-list">{savedMedicines.map((m) => <div className="saved-row" key={m.id}><div className="medicine-icon"><Pill size={20}/></div><div className="saved-info"><strong>{m.name} <span>{m.strength}</span></strong><small>{m.composition} · {m.pack}</small></div><strong className="price">₹{m.price.toFixed(2)}</strong><button className="icon-button" aria-label="Remove medicine" onClick={() => toggleSave(m.id)}><X size={17}/></button></div>)}</div><div className="list-total"><div><small>Estimated listed total</small><strong>₹{total.toFixed(2)}</strong><span>Sample prices; quantity and availability not confirmed.</span></div><button className="primary-button" onClick={shareList}>Share list <ArrowRight size={17}/></button></div></> : <div className="empty-state"><Bookmark size={28}/><h3>Your list is empty</h3><p>Save medicines from search results to make a visit-ready list.</p><button className="secondary-button" onClick={() => setActiveTab("search")}>Find medicines</button></div>}
          </section>
        )}

        {activeTab === "stores" && (
          <section className="content-section">
            <div className="section-heading"><div><span className="section-kicker">STORE DIRECTORY</span><h2>Find a Jan Aushadhi Kendra</h2><p>Search by city or PIN code to find a store near you.</p></div></div>
            <div className="location-search"><MapPin size={20}/><input value={locationText} onChange={(e) => setLocationText(e.target.value)} placeholder="Enter city or PIN code"/><button className="secondary-button" onClick={useLocation}><Navigation size={16}/> Use my location</button></div>
            <div className="store-disclaimer"><Info size={16}/> These are sample store cards for the prototype, not verified directory entries. Replace with official PMBI store data before launch.</div>
            <div className="store-grid">{kendras.map((k) => <div className="store-card" key={k.id}><div className="store-icon"><MapPin size={21}/></div><div className="store-title"><h3>{k.name}</h3><span className="stock-tag">{k.status}</span></div><p>{k.address}</p><div className="store-meta"><span><Phone size={15}/>{k.phone}</span><span><Clock3 size={15}/>{k.hours}</span></div><button className="secondary-button store-action" onClick={() => setNotice("Store contact and map details need to be verified from an official directory before publishing.")}>View store details <ArrowRight size={16}/></button></div>)}</div>
          </section>
        )}

        <section className="how-section">
          <div className="section-heading"><div><span className="section-kicker">HOW IT WORKS</span><h2>Three simple steps</h2></div></div>
          <div className="steps-grid"><div className="step"><span className="step-number">01</span><div className="step-icon"><Search size={21}/></div><h3>Search</h3><p>Find a medicine by name, strength, or composition.</p></div><div className="step"><span className="step-number">02</span><div className="step-icon"><BookmarkCheck size={21}/></div><h3>Save your list</h3><p>Keep the medicines you need together in one place.</p></div><div className="step"><span className="step-number">03</span><div className="step-icon"><MapPin size={21}/></div><h3>Visit a Kendra</h3><p>Find a store and confirm the medicine is in stock before travelling.</p></div></div>
        </section>

        <section className="safety-note"><ShieldCheck size={22}/><div><strong>Important medicine safety note</strong><p>This prototype is for information only. Prices and store details are sample data and may be outdated. Always confirm the exact medicine, strength, formulation, and availability with a qualified pharmacist or your doctor. Do not change or substitute prescribed medicines based on this website.</p></div></section>
      </main>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><HeartPulse size={20}/></span><span><strong>Dawai Circle</strong><small>Affordable medicine finder</small></span></a><div className="footer-copy">Independent prototype. Not affiliated with PMBI or the Government of India.</div><div className="footer-links"><a href="#safety">Privacy</a><a href="#safety">Disclaimer</a></div></footer>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="medicine-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X size={19}/></button><div className="modal-icon"><Pill size={25}/></div><span className="section-kicker">MEDICINE DETAILS · DEMO</span><h2 id="modal-title">{selected.name} <span>{selected.strength}</span></h2><div className="modal-price">₹{selected.price.toFixed(2)} <small>per {selected.pack}</small></div><div className="detail-table"><div><span>Composition</span><strong>{selected.composition}</strong></div><div><span>Dosage form</span><strong>{selected.form}</strong></div><div><span>Catalogue code</span><strong>{selected.code}</strong></div><div><span>Pack size</span><strong>{selected.pack}</strong></div><div><span>Category</span><strong>{selected.category}</strong></div></div><p className="modal-description">{selected.description}</p><div className="modal-warning"><Info size={16}/> Demo values are not verified current PMBI prices. Confirm with a pharmacist.</div><button className="primary-button full-button" onClick={() => { toggleSave(selected.id); setSelected(null); }}>{saved.includes(selected.id) ? <><BookmarkCheck size={17}/> Remove from list</> : <><Plus size={17}/> Save to my list</>}</button></div></div>}
    </div>
  );
}

function MedicineCard({ medicine, saved, onSave, onDetails }) {
  return <article className="medicine-card"><div className="card-top"><div className="medicine-icon"><Pill size={22}/></div><button className={saved ? "save-button saved" : "save-button"} onClick={onSave} aria-label={saved ? "Remove saved medicine" : "Save medicine"}>{saved ? <BookmarkCheck size={19}/> : <Bookmark size={19}/>}</button></div><div className="medicine-category">{medicine.category}</div><h3>{medicine.name}</h3><div className="medicine-subtitle">{medicine.strength} · {medicine.form}</div><div className="composition">{medicine.composition}</div><div className="card-bottom"><div><span className="price-label">Listed demo price</span><strong className="price">₹{medicine.price.toFixed(2)}</strong><small>{medicine.pack}</small></div><button className="details-button" onClick={onDetails}>Details <ArrowRight size={15}/></button></div></article>;
}

createRoot(document.getElementById("root")).render(<App />);
