import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowRight, DollarSign, TrendingUp, Clock, Zap, Building2, FolderGit2 } from 'lucide-react';
import './Steps.css';

export default function Step5_DeepDive() {
  const navigate = useNavigate();
  const { selectedCareer, saveStepData } = useUser();

  if (!selectedCareer) {
    navigate('/journey/4');
    return null;
  }

  const c = selectedCareer;

  const handleNext = () => {
    saveStepData(5, { career: c.id });
    navigate('/journey/6');
  };

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 5 · Deep Dive</div>
        <h1 className="step-title">Everything about <span className="gradient-text">{c.title}</span></h1>
        <p className="step-desc">Let's explore what this career really looks like — salary, demand, skills, and real projects.</p>
      </div>

      {/* Hero Banner */}
      <div className="deep-hero" style={{ background: c.gradient }}>
        <div className="deep-hero-overlay" />
        <div className="deep-hero-content">
          <span className="deep-hero-emoji">{c.emoji}</span>
          <div>
            <h2 style={{ color: '#fff', marginBottom: '0.25rem' }}>{c.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>{c.tagline}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="deep-stats-grid stagger">
        <div className="deep-stat-card anim-fade-up">
          <DollarSign size={22} style={{ color: '#22c55e' }} />
          <div className="deep-stat-value">{c.salary.min}–{c.salary.max} {c.salary.currency}</div>
          <div className="deep-stat-label">Salary Range</div>
        </div>
        <div className="deep-stat-card anim-fade-up">
          <TrendingUp size={22} style={{ color: '#6366f1' }} />
          <div className="deep-stat-value">{c.demand}%</div>
          <div className="deep-stat-label">Market Demand</div>
        </div>
        <div className="deep-stat-card anim-fade-up">
          <Clock size={22} style={{ color: '#f59e0b' }} />
          <div className="deep-stat-value" style={{ fontSize: '0.95rem' }}>{c.timeline}</div>
          <div className="deep-stat-label">Time to Job-Ready</div>
        </div>
        <div className="deep-stat-card anim-fade-up">
          <Zap size={22} style={{ color: '#ec4899' }} />
          <div className="deep-stat-value">{'⭐'.repeat(c.difficulty)}</div>
          <div className="deep-stat-label">Difficulty ({c.difficulty}/5)</div>
        </div>
      </div>

      {/* Description */}
      <div className="step-section">
        <h3 className="section-label">About this career</h3>
        <p style={{ lineHeight: '1.8', color: 'var(--pp-text-sub)' }}>{c.description}</p>
      </div>

      {/* Skills */}
      <div className="step-section">
        <h3 className="section-label">Key skills to learn</h3>
        <div className="skills-list">
          {c.skills.map((skill, i) => (
            <div className="skill-chip anim-fade-up" key={skill} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="skill-chip-dot" style={{ background: c.color }} />
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Top Companies */}
      <div className="step-section">
        <h3 className="section-label"><Building2 size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Top Companies Hiring</h3>
        <div className="flex gap-2 wrap">
          {c.topCompanies.map(co => (
            <span key={co} className="company-badge">{co}</span>
          ))}
        </div>
      </div>

      {/* Real-world Projects */}
      <div className="step-section">
        <h3 className="section-label"><FolderGit2 size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Real-world Projects You'll Build</h3>
        <div className="project-chips-grid">
          {c.realWorldProjects.map((proj, i) => (
            <div className="project-chip anim-fade-up" key={proj} style={{ animationDelay: `${i * 0.08}s`, borderColor: c.color + '40' }}>
              <span className="project-chip-num" style={{ background: c.gradient }}>0{i + 1}</span>
              <span>{proj}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="step-footer">
        <button className="btn btn-primary btn-lg" onClick={handleNext}>
          Choose My Learning Path <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
