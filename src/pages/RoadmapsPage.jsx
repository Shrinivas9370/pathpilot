import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAREERS } from '../data/careers';
import { Search, Clock, Zap, TrendingUp, ChevronRight, ArrowLeft, Compass } from 'lucide-react';
import './RoadmapsPage.css';

const DEMAND_LABEL = (d) => d >= 90 ? 'Very High' : d >= 80 ? 'High' : 'Moderate';
const DEMAND_BG = (d) => d >= 90 ? '#d1fae5' : d >= 80 ? '#e0f2fe' : '#f3e8ff';
const DEMAND_FG = (d) => d >= 90 ? '#047857' : d >= 80 ? '#0369a1' : '#6b21a8';
const DIFF_LABEL = (d) => d >= 4 ? 'Hard' : d === 3 ? 'Medium' : 'Easy';

export default function RoadmapsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredCareers = CAREERS.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="roadmaps-page bg-surface min-h-screen">
       <div className="r-nav">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
             <ArrowLeft size={18} /> Back
          </button>
       </div>

      <div className="r-hero">
        <div className="r-hero-badge">ALL CAREER PATHS</div>
        <h1 className="r-hero-title">Explore Career Roadmaps</h1>
        <p className="r-hero-subtitle">
          Discover structured paths to land your dream role in tech. Browse by demand, salary, and difficulty.
        </p>

        <div className="r-search-container">
          <Search className="r-search-icon" size={20} />
          <input 
            type="text" 
            className="r-search-input" 
            placeholder="Search career paths..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="r-grid-container">
        <div className="r-grid">
          {filteredCareers.slice(0, visibleCount).map((c, i) => (
            <div key={c.id} className="r-card anim-fade-up" style={{ animationDelay: `${(i % 10) * 0.05}s` }}>
              <div className="r-card-accent" style={{ backgroundColor: c.color }}></div>
              <div className="r-card-header">
                <h3 className="r-card-title">{c.title}</h3>
                <span className="r-demand-badge" style={{ backgroundColor: DEMAND_BG(c.demand), color: DEMAND_FG(c.demand) }}>
                  {DEMAND_LABEL(c.demand)}
                </span>
              </div>
              <p className="r-card-desc">{c.tagline}</p>
              
              <div className="r-stats">
                 <div className="r-stat-row">
                    <Clock size={16} className="r-stat-icon" style={{color: '#94a3b8'}} />
                    <span>{c.timeline}</span>
                 </div>
                 <div className="r-stat-row">
                    <Zap size={16} className="r-stat-icon" style={{color: '#94a3b8'}} />
                    <div className="diff-dots">
                      {Array.from({length: 5}).map((_, idx) => (
                        <div key={idx} className={`diff-dot ${idx < c.difficulty ? 'filled' : ''}`} style={{ backgroundColor: idx < c.difficulty ? c.color : '#e2e8f0' }} />
                      ))}
                    </div>
                    <span>{DIFF_LABEL(c.difficulty)}</span>
                 </div>
                 <div className="r-stat-row">
                    <TrendingUp size={16} className="r-stat-icon" style={{color: '#94a3b8'}} />
                    <span>{c.salary.min}–{c.salary.max} {c.salary.currency}</span>
                 </div>
              </div>

              <button className="r-action-btn" onClick={() => navigate(`/career/${c.id}`)}>
                View Roadmap <ChevronRight size={16} />
              </button>
            </div>
          ))}

          {filteredCareers.length === 0 && (
             <div className="r-no-results">
                No career paths match your search.
             </div>
          )}
        </div>

        {visibleCount < filteredCareers.length && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="r-action-btn" style={{ maxWidth: '200px', margin: '0 auto', background: 'transparent' }} onClick={() => setVisibleCount(prev => prev + 9)}>
               View More
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer" style={{ width: '100%', marginTop: 'auto' }}>
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-section">
              <div className="logo-icon bg-purple"><Compass size={18} /></div>
              <span className="logo-text text-white">PathPilot AI</span>
            </div>
            <p className="footer-desc">Your intelligent career co-pilot. We stop the guessing game in tech education.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Roadmap Generator</a>
              <a style={{cursor: 'pointer'}} onClick={() => navigate('/compare')}>Compare Careers</a>
              <a href="#">Project Ideas</a>
              <a href="#">Student Dashboard</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Tech Careers List</a>
              <a href="#">Salary Guide</a>
              <a href="#">Top Platforms</a>
              <a href="#">Parents Guide</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PathPilot AI. Built for CS Students worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
