import React, { useState, useMemo, useEffect } from 'react'

const SAMPLE_TRIALS = [
  { id: 1, title: 'Diabetes Glucose Control Study', phase: 'Phase 2', location: 'New York, NY', description: 'Evaluates glucose control strategies and device monitoring in adults with Type 2 diabetes.' },
  { id: 2, title: 'Hypertension Medication Trial', phase: 'Phase 3', location: 'Boston, MA', description: 'Comparing a new antihypertensive combination against standard of care for blood pressure control.' },
  { id: 3, title: 'COVID-19 Vaccine Follow-up', phase: 'Phase 4', location: 'San Francisco, CA', description: 'Long-term safety and effectiveness follow-up of an authorized COVID-19 vaccine.' },
  { id: 4, title: 'Alzheimer Progression Biomarker Study', phase: 'Phase 2', location: 'Seattle, WA', description: 'Investigating novel biomarkers to track Alzheimer disease progression.' },
  { id: 5, title: 'Chronic Pain Neuromodulation Trial', phase: 'Phase 3', location: 'Chicago, IL', description: 'Assessing a neuromodulation device for chronic lower-back pain relief.' },
  { id: 6, title: 'Asthma Inhaler Efficacy Study', phase: 'Phase 2', location: 'Denver, CO', description: 'Testing improved inhaler formulations for symptomatic control in moderate asthma.' },
  { id: 7, title: 'Rheumatoid Arthritis New Agent', phase: 'Phase 3', location: 'Houston, TX', description: 'Efficacy and safety evaluation of a novel biologic therapy for RA.' },
  { id: 8, title: 'Breast Cancer Adjuvant Therapy', phase: 'Phase 4', location: 'Los Angeles, CA', description: 'Post-marketing analysis of long-term outcomes for adjuvant therapy.' },
  { id: 9, title: 'Osteoporosis Bone Density Trial', phase: 'Phase 3', location: 'Minneapolis, MN', description: 'Studying a new treatment to increase bone mineral density and reduce fracture risk.' },
  { id: 10, title: 'Migraine Preventative Study', phase: 'Phase 1', location: 'Philadelphia, PA', description: 'Early safety and tolerability study of an experimental migraine preventive agent.' },
  { id: 11, title: 'Parkinson Symptom Management Study', phase: 'Phase 3', location: 'San Diego, CA', description: 'Evaluating a therapy to reduce motor fluctuations in Parkinson disease.' },
  { id: 12, title: 'Depression Digital Therapeutic Trial', phase: 'Phase 2', location: 'Austin, TX', description: 'Testing a digital therapeutic app for moderate depression as adjunctive care.' },
  { id: 13, title: 'Cholesterol Reduction Combination Study', phase: 'Phase 4', location: 'Phoenix, AZ', description: 'Real-world outcomes for a combination lipid-lowering regimen.' },
  { id: 14, title: 'Hepatitis C Treatment Optimization', phase: 'Phase 3', location: 'Atlanta, GA', description: 'Comparing shorter-course regimens for sustained virologic response.' },
  { id: 15, title: 'Pediatric Vaccination Safety Study', phase: 'Phase 2', location: 'Columbus, OH', description: 'Assessing safety and immune response of a pediatric vaccine candidate.' },
  { id: 16, title: 'Multiple Sclerosis Remission Trial', phase: 'Phase 3', location: 'Cleveland, OH', description: 'Investigating a maintenance therapy to prolong remission in MS.' },
  { id: 17, title: 'Influenza Next-Gen Vaccine Study', phase: 'Phase 4', location: 'Orlando, FL', description: 'Surveillance and effectiveness study for a next-generation influenza vaccine.' },
  { id: 18, title: 'Obesity Metabolic Intervention', phase: 'Phase 3', location: 'Nashville, TN', description: 'Evaluating a metabolic intervention combined with lifestyle counseling for weight loss.' },
  { id: 19, title: 'Dermatology Topical Agent Study', phase: 'Phase 1', location: 'Portland, OR', description: 'Initial safety assessment of a topical agent for inflammatory skin disease.' },
  { id: 20, title: 'Chronic Kidney Disease Progression Study', phase: 'Phase 3', location: 'Detroit, MI', description: 'Testing a therapeutic approach to slow CKD progression in adults.' },
  { id: 21, title: 'Sleep Apnea Device Trial', phase: 'Phase 2', location: 'San Antonio, TX', description: 'Pilot study of a new mandibular advancement device for obstructive sleep apnea.' },
  { id: 22, title: 'Ovarian Cancer Maintenance Therapy', phase: 'Phase 3', location: 'Richmond, VA', description: 'Evaluating maintenance therapy to extend disease-free survival.' },
  { id: 23, title: 'Rare Genetic Disorder Natural History', phase: 'Phase 4', location: 'Raleigh, NC', description: 'Observational study documenting the natural history of a rare genetic condition.' }
]

function TrialCard({ trial, onView, isBookmarked, onToggleBookmark }) {
  const p = trial.phase.toLowerCase()
  const phaseClass = p.includes('1') ? 'phase-1' : p.includes('2') ? 'phase-2' : p.includes('3') ? 'phase-3' : 'phase-4'

  return (
    <div className="card">
      <div className="card-head">
        <h3>{trial.title}</h3>
        <div className="card-actions">
          <button
            type="button"
            className="icon-btn bookmark-btn"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark trial'}
            aria-pressed={isBookmarked}
            onClick={onToggleBookmark}
          >
            {isBookmarked ? (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h10a1 1 0 0 1 1 1v16l-6-3-6 3V4a1 1 0 0 1 1-1z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h10a1 1 0 0 1 1 1v16l-6-3-6 3V4a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
          <span className={`badge ${phaseClass}`}>{trial.phase}</span>
        </div>
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

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookmarkedTrials')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bookmarkedTrials', JSON.stringify(bookmarkedIds))
    } catch {}
  }, [bookmarkedIds])

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

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
              <TrialCard
                key={t.id}
                trial={t}
                isBookmarked={bookmarkedIds.includes(t.id)}
                onToggleBookmark={() => toggleBookmark(t.id)}
                onView={t => setModalTrial(t)}
              />
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
              {modalTrial.description && <p style={{marginTop:8}}>{modalTrial.description}</p>}
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
