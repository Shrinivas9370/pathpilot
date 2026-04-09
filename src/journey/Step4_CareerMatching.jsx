import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { matchCareers } from '../data/careers';
import { ArrowRight, Sparkles, Trophy, Medal, Award } from 'lucide-react';
import './Steps.css';

const RANK_ICONS = [
  <Trophy size={20} style={{ color: '#f59e0b' }} />,
  <Medal size={20} style={{ color: '#94a3b8' }} />,
  <Award size={20} style={{ color: '#cd7c2f' }} />,
];

export default function Step4_CareerMatching() {
  const navigate = useNavigate();
  const { profile, saveStepData, setMatchedCareers, setSelectedCareer } = useUser();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = matchCareers(profile);
      setMatches(results);
      setMatchedCareers(results);
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (career) => {
    setPicked(career.id);
    setSelectedCareer(career);
  };

  const handleNext = () => {
    const c = matches.find(m => m.id === picked);
    saveStepData(4, { matches: matches.slice(0, 3), selected: c });
    navigate('/journey/5');
  };

  if (loading) {
    return (
      <div className="step-page anim-fade-up">
        <div className="matching-loader">
          <div className="loader-orb" />
          <h2 style={{ marginTop: '2rem' }}>Running AI Matching...</h2>
          <p className="text-sub" style={{ marginTop: '0.5rem' }}>Analyzing your interests, skills & personality</p>
          <div className="loader-steps">
            <div className="loader-step anim-fade-in" style={{ animationDelay: '0.3s' }}>✓ Reading your interests</div>
            <div className="loader-step anim-fade-in" style={{ animationDelay: '0.8s' }}>✓ Evaluating skill scores</div>
            <div className="loader-step anim-fade-in" style={{ animationDelay: '1.4s' }}>✓ Applying personality weights</div>
            <div className="loader-step anim-fade-in" style={{ animationDelay: '1.9s' }}>✓ Ranking career matches</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 4 · AI Career Matching</div>
        <h1 className="step-title">Your <span className="gradient-text">top matches</span></h1>
        <p className="step-desc">Based on your interests, skills & personality — here are your best-fit careers. Select one to deep-dive.</p>
      </div>

      {/* Formula explainer */}
      <div className="formula-card">
        <Sparkles size={16} style={{ color: 'var(--pp-primary-light)' }} />
        <span className="formula-label">Match Score =</span>
        <span className="formula-part interest">(Interests × 40%)</span>
        <span>+</span>
        <span className="formula-part skill">(Skills × 40%)</span>
        <span>+</span>
        <span className="formula-part personality">(Personality × 20%)</span>
      </div>

      {/* Top 3 */}
      <div className="match-list stagger">
        {matches.slice(0, 3).map((career, i) => (
          <div
            key={career.id}
            className={`match-card anim-fade-up ${picked === career.id ? 'match-selected' : ''}`}
            onClick={() => handleSelect(career)}
            style={{ '--i': i }}
          >
            <div className="match-rank">{RANK_ICONS[i]}</div>
            <div className="match-gradient-strip" style={{ background: career.gradient }} />
            <div className="match-body">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: '2.2rem' }}>{career.emoji}</span>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{career.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--pp-text-muted)', margin: 0 }}>{career.tagline}</p>
                </div>
              </div>

              {/* Score Bar */}
              <div className="match-score-row">
                <span className="text-sm font-semibold" style={{ color: 'var(--pp-text-sub)' }}>Match Score</span>
                <span className="match-score-value" style={{ color: career.color }}>{career.matchScore}%</span>
              </div>
              <div className="progress-track mb-3">
                <div className="progress-fill" style={{ width: `${career.matchScore}%`, background: career.gradient }} />
              </div>

              <div className="flex gap-2 wrap">
                {career.tags.map(t => <span key={t} className="badge badge-primary">{t}</span>)}
              </div>
            </div>
            {picked === career.id && <div className="match-check">✓ Selected</div>}
          </div>
        ))}
      </div>

      {/* All matches */}
      <details className="other-matches">
        <summary className="other-matches-toggle">See all {matches.length} career matches</summary>
        <div className="other-matches-grid">
          {matches.slice(3).map(career => (
            <div key={career.id} className={`other-match-item ${picked === career.id ? 'match-selected' : ''}`} onClick={() => handleSelect(career)}>
              <span>{career.emoji}</span>
              <span className="font-medium">{career.title}</span>
              <span className="match-score-sm" style={{ color: career.color }}>{career.matchScore}%</span>
            </div>
          ))}
        </div>
      </details>

      <div className="step-footer">
        <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={!picked}>
          Deep Dive into {picked ? matches.find(m => m.id === picked)?.title?.split(' ')[0] : 'Career'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
