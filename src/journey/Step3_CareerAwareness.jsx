import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CAREERS } from '../data/careers';
import { ArrowRight, Bookmark, BookmarkCheck, TrendingUp, Clock, Zap, DollarSign } from 'lucide-react';
import './Steps.css';

const DEMAND_LABEL = (d) => d >= 90 ? '🔥 Very High' : d >= 80 ? '📈 High' : '📊 Moderate';
const DIFF_STARS = (d) => '⭐'.repeat(d) + '☆'.repeat(5 - d);

export default function Step3_CareerAwareness() {
  const navigate = useNavigate();
  const { saveStepData, toggleSaveCareer, savedCareers } = useUser();
  const [filter, setFilter] = useState('all');

  const filters = ['all', 'beginner-friendly', 'high-salary', 'high-demand'];

  const filtered = CAREERS.filter(c => {
    if (filter === 'beginner-friendly') return c.difficulty <= 2;
    if (filter === 'high-salary') return c.salary.max >= 35;
    if (filter === 'high-demand') return c.demand >= 90;
    return true;
  });

  const handleNext = () => {
    saveStepData(3, { seenCareers: CAREERS.map(c => c.id) });
    navigate('/journey/4');
  };

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 3 · Career Awareness</div>
        <h1 className="step-title">Explore what's <span className="gradient-text">out there</span></h1>
        <p className="step-desc">Browse the top tech careers. Bookmark the ones that catch your eye — we'll factor them into your AI match.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 wrap">
        {filters.map(f => (
          <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? '🌐 All Careers' : f === 'beginner-friendly' ? '🌱 Beginner Friendly' : f === 'high-salary' ? '💰 High Salary' : '🔥 High Demand'}
          </button>
        ))}
      </div>

      {/* Career Cards Grid */}
      <div className="career-cards-grid stagger">
        {filtered.map((career, i) => {
          const saved = savedCareers.find(c => c.id === career.id);
          return (
            <div className="career-awareness-card anim-fade-up" key={career.id} style={{ '--i': i }}>
              {/* Top Gradient Bar */}
              <div className="career-hero-bar" style={{ background: career.gradient }} />

              <div className="career-card-body">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="career-emoji">{career.emoji}</span>
                    <h3 className="career-title-text">{career.title}</h3>
                    <p className="career-tagline">{career.tagline}</p>
                  </div>
                  <button className="btn-icon" onClick={() => toggleSaveCareer(career)} data-tip={saved ? 'Unsave' : 'Save'}>
                    {saved ? <BookmarkCheck size={18} style={{ color: 'var(--pp-primary-light)' }} /> : <Bookmark size={18} />}
                  </button>
                </div>

                <p className="career-desc-short">{career.description.slice(0, 90)}...</p>

                {/* Stats Row */}
                <div className="career-stats-row">
                  <div className="career-stat">
                    <DollarSign size={13} />
                    <span>{career.salary.min}–{career.salary.max} {career.salary.currency}</span>
                  </div>
                  <div className="career-stat">
                    <TrendingUp size={13} />
                    <span>{DEMAND_LABEL(career.demand)}</span>
                  </div>
                  <div className="career-stat">
                    <Clock size={13} />
                    <span>{career.timeline}</span>
                  </div>
                  <div className="career-stat">
                    <Zap size={13} />
                    <span>{DIFF_STARS(career.difficulty)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 wrap mt-3">
                  {career.tags.map(t => <span key={t} className="badge badge-primary">{t}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="step-footer">
        <div className="text-sm text-muted">
          {savedCareers.length > 0 ? `✓ ${savedCareers.length} career${savedCareers.length > 1 ? 's' : ''} saved` : 'Tip: Save careers you like for better AI matching'}
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleNext}>
          Run AI Matching <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
