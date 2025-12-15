import React, { useState, useMemo, useEffect } from 'react'

const SAMPLE_TRIALS = [
  { id: 1, title: 'Diabetes Glucose Control Study', phase: 'Phase 2', location: 'New York, NY' },
  { id: 2, title: 'Hypertension Medication Trial', phase: 'Phase 3', location: 'Boston, MA' },
  { id: 3, title: 'COVID-19 Vaccine Follow-up', phase: 'Phase 4', location: 'San Francisco, CA' },
  { id: 4, title: 'Alzheimer Progression Biomarker Study', phase: 'Phase 2', location: 'Seattle, WA' },
  { id: 5, title: 'Chronic Pain Neuromodulation Trial', phase: 'Phase 3', location: 'Chicago, IL' },
  { id: 6, title: 'Asthma Inhaler Efficacy Study', phase: 'Phase 2', location: 'Denver, CO' },
  { id: 7, title: 'Rheumatoid Arthritis New Agent', phase: 'Phase 3', location: 'Houston, TX' },
  { id: 8, title: 'Breast Cancer Adjuvant Therapy', phase: 'Phase 4', location: 'Los Angeles, CA' },
  { id: 9, title: 'Osteoporosis Bone Density Trial', phase: 'Phase 3', location: 'Minneapolis, MN' },
  { id: 10, title: 'Migraine Preventative Study', phase: 'Phase 1', location: 'Philadelphia, PA' },
  { id: 11, title: 'Parkinson Symptom Management Study', phase: 'Phase 3', location: 'San Diego, CA' },
  { id: 12, title: 'Depression Digital Therapeutic Trial', phase: 'Phase 2', location: 'Austin, TX' },
  { id: 13, title: 'Cholesterol Reduction Combination Study', phase: 'Phase 4', location: 'Phoenix, AZ' },
  { id: 14, title: 'Hepatitis C Treatment Optimization', phase: 'Phase 3', location: 'Atlanta, GA' },
  { id: 15, title: 'Pediatric Vaccination Safety Study', phase: 'Phase 2', location: 'Columbus, OH' },
  { id: 16, title: 'Multiple Sclerosis Remission Trial', phase: 'Phase 3', location: 'Cleveland, OH' },
  { id: 17, title: 'Influenza Next-Gen Vaccine Study', phase: 'Phase 4', location: 'Orlando, FL' },
  { id: 18, title: 'Obesity Metabolic Intervention', phase: 'Phase 3', location: 'Nashville, TN' },
  { id: 19, title: 'Dermatology Topical Agent Study', phase: 'Phase 1', location: 'Portland, OR' },
  { id: 20, title: 'Chronic Kidney Disease Progression Study', phase: 'Phase 3', location: 'Detroit, MI' },
  { id: 21, title: 'Sleep Apnea Device Trial', phase: 'Phase 2', location: 'San Antonio, TX' },
  { id: 22, title: 'Ovarian Cancer Maintenance Therapy', phase: 'Phase 3', location: 'Richmond, VA' },
  { id: 23, title: 'Rare Genetic Disorder Natural History', phase: 'Phase 4', location: 'Raleigh, NC' }
]

function TrialCard({ trial, onView }) {
  const p = trial.phase.toLowerCase()
  const phaseClass = p.includes('1') ? 'phase-1' : p.includes('2') ? 'phase-2' : p.includes('3') ? 'phase-3' : 'phase-4'

  return (
    <div className="card">
      <div className="card-head">
        <h3>{trial.title}</h3>
        <span className={`badge ${phaseClass}`}>{trial.phase}</span>
      </div>

      <div className="meta">
        <div>📍 {trial.location}</div>
      </div>

      <p className="desc"></p>

      <div className="cta">
        <button className="btn">Apply</button>
        <button className="btn secondary" onClick={() => onView && onView(trial)}>View Details</button>
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState('')
  const [modalTrial, setModalTrial] = useState(null)

  const trials = useMemo(() => SAMPLE_TRIALS, [])

  const filtered = trials.filter(t => {
    const matchesQuery = query === '' || t.title.toLowerCase().includes(query.toLowerCase())
    const matchesPhase = phaseFilter === '' || t.phase === phaseFilter
    return matchesQuery && matchesPhase
  })

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setModalTrial(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="container">
      <nav className="topnav">
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#0b76ef" />
            <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="nav-title">Medical Trials Portal</div>
        <div className="nav-actions">
          <input className="nav-search" placeholder="Search trials..." value={query} onChange={e => setQuery(e.target.value)} />
          <div className="avatar">BP</div>
        </div>
      </nav>

      <div className="hero">
        <div className="summary">
          <h2>Find relevant clinical trials near you</h2>
          <p>Search, filter, and express interest in clinical studies.</p>
        </div>
        <div className="actions">
          <div className="pill">Trials: {trials.length}</div>
        </div>
      </div>

      <section className="controls">
        <select value={phaseFilter} onChange={e => setPhaseFilter(e.target.value)}>
          <option value="">All phases</option>
          <option>Phase 1</option>
          <option>Phase 2</option>
          <option>Phase 3</option>
          <option>Phase 4</option>
        </select>
      </section>

      <main>
        {filtered.length === 0 ? (
          <p>No trials match your search.</p>
        ) : (
          <div className="grid">
            {filtered.map(t => (
              <TrialCard key={t.id} trial={t} onView={t => setModalTrial(t)} />
            ))}
          </div>
        )}
      </main>

      {modalTrial && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <header className="modal-header">
              <h3>{modalTrial.title}</h3>
            </header>
            <div className="modal-body">
              <p><strong>Location:</strong> {modalTrial.location}</p>
              <p><strong>Phase:</strong> {modalTrial.phase}</p>
            </div>
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setModalTrial(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer" />
    </div>
  )
}
