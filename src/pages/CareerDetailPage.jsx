import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getCareerById } from '../data/careers';
import { getResourcesByCareer } from '../data/resources';
import { ArrowLeft, DollarSign, TrendingUp, Clock, Zap, BookmarkCheck, Bookmark, ChevronRight } from 'lucide-react';
import './CareerDetailPage.css';

export default function CareerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedCareers, toggleSaveCareer, setSelectedCareer } = useUser();

  const career = getCareerById(id);
  const resources = getResourcesByCareer(id);
  const saved = savedCareers.find(c => c.id === id);

  if (!career) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Career not found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handleStartJourney = () => {
    setSelectedCareer(career);
    navigate('/journey/5');
  };

  return (
    <div className="career-page">
      {/* Top Nav inside page */}
      <nav className="career-nav">
        <div className="nav-inner">
          <div className="logo-section" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className="logo-icon" style={{width: 24, height: 24}}>{career.emoji}</div>
            <span className="logo-text">PathPilot AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost" onClick={() => toggleSaveCareer(career)}>
              {saved ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save</>}
            </button>
            <button className="btn btn-white" onClick={handleStartJourney}>Track My Progress</button>
          </div>
        </div>
      </nav>

      {/* Purple Hero Section */}
      <section className="career-hero bg-purple">
        <div className="career-hero-inner">
          <div className="hero-left">
            <button className="btn-back" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> All Roadmaps
            </button>
            <h1 className="career-title">{career.title}</h1>
            <h3 className="career-subtitle">{career.tagline}</h3>
            <p className="career-desc">{career.description}</p>
            <button className="btn btn-white btn-lg" onClick={handleStartJourney}>
              <Bookmark size={16} style={{marginRight: '0.5rem', display: 'inline'}} /> Track My Progress
            </button>
          </div>
          
          <div className="hero-right stats-grid">
            <div className="stat-card ghost">
              <div className="stat-icon"><DollarSign size={14}/> Avg Salary</div>
              <div className="stat-val">{career.salary.min}–{career.salary.max} {career.salary.currency}</div>
            </div>
            <div className="stat-card ghost">
              <div className="stat-icon"><Clock size={14}/> Timeline</div>
              <div className="stat-val">{career.timeline}</div>
            </div>
            <div className="stat-card ghost">
              <div className="stat-icon"><TrendingUp size={14}/> Industry Demand</div>
              <div className="stat-progress-val">
                <span className={career.demand > 85 ? 'text-green' : 'text-yellow'}>
                  {career.demand > 85 ? 'Very High' : 'High'}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill bg-green" style={{ width: `${career.demand}%` }} />
              </div>
            </div>
            <div className="stat-card ghost">
              <div className="stat-icon"><Zap size={14}/> Difficulty</div>
              <div className="stat-val text-red">
                {career.difficulty >= 4 ? 'Hard' : career.difficulty === 3 ? 'Medium' : 'Easy'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Content */}
      <section className="career-content">
        <div className="content-inner">
          <div className="section-header">
            <h2>Learning Roadmap</h2>
            <p>Your step-by-step journey from beginner to job-ready.</p>
          </div>

          <div className="roadmap-modules">
            {/* Phase 1 */}
            <div className="module-card">
              <div className="module-header">
                <div className="module-num bg-green">1</div>
                <div className="module-meta">
                  <span className="badge badge-green">Beginner</span>
                  <span className="meta-time"><Clock size={14}/> Months 1–2</span>
                </div>
              </div>
              <div className="module-body">
                <h3>Foundations</h3>
                <p className="task-text">{career.month1_2}</p>
                <div className="skills-row">
                  {career.skills.slice(0, 3).map(s => <span key={s} className="skill-pill">{s}</span>)}
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="module-card">
              <div className="module-header">
                <div className="module-num bg-yellow">2</div>
                <div className="module-meta">
                  <span className="badge badge-yellow">Intermediate</span>
                  <span className="meta-time"><Clock size={14}/> Months 3–5</span>
                </div>
              </div>
              <div className="module-body">
                <h3>Projects & Practice</h3>
                <p className="task-text">{career.month3_5}</p>
                <div className="projects-list">
                  {career.realWorldProjects.map(p => (
                    <div key={p} className="project-item"><ChevronRight size={14}/> {p}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="module-card">
              <div className="module-header">
                <div className="module-num bg-red">3</div>
                <div className="module-meta">
                  <span className="badge badge-red">Advanced</span>
                  <span className="meta-time"><Clock size={14}/> Month 6</span>
                </div>
              </div>
              <div className="module-body">
                <h3>Job Ready & Interviews</h3>
                <p className="task-text">{career.month6}</p>
                <div className="companies-row">
                  {career.topCompanies.map(c => <span key={c} className="company-pill">{c}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
