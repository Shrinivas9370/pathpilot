import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowRight, Clock, BookOpen, Flame } from 'lucide-react';
import './Steps.css';

const LEVELS = [
  { id: 'beginner', label: 'Beginner', emoji: '🌱', desc: 'I\'m starting from scratch. Keep it simple and foundational.', color: '#22c55e' },
  { id: 'intermediate', label: 'Intermediate', emoji: '⚡', desc: 'I know the basics. I want to level up and build real projects.', color: '#6366f1' },
  { id: 'advanced', label: 'Advanced', emoji: '🔥', desc: 'I\'m experienced. Show me what gets me to expert level.', color: '#ec4899' },
];

const TIME_OPTIONS = [
  { id: '1h', label: '1 hr/day', desc: 'Light pace, 12–18 months', icon: '🌙' },
  { id: '2h', label: '2 hrs/day', desc: 'Steady pace, 8–12 months', icon: '☀️' },
  { id: '4h', label: '4 hrs/day', desc: 'Intensive, 4–6 months', icon: '🚀' },
  { id: 'full', label: 'Full-time', desc: 'Bootcamp mode, 2–3 months', icon: '⚡' },
];

export default function Step6_LearningPath() {
  const navigate = useNavigate();
  const { selectedCareer, saveStepData } = useUser();
  const [level, setLevel] = useState(null);
  const [time, setTime] = useState(null);
  const [style, setStyle] = useState([]);

  const STYLES = ['📹 Video Courses', '📖 Books & Docs', '🛠️ Hands-on Projects', '🤝 Study Groups', '🏆 Competitive Coding', '📝 Structured Curriculum'];

  const toggleStyle = (s) => setStyle(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleNext = () => {
    saveStepData(6, { level, time, style });
    navigate('/journey/7');
  };

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 6 · Learning Path</div>
        <h1 className="step-title">Your <span className="gradient-text">learning style</span></h1>
        <p className="step-desc">Tell us how you learn best — we'll customize your resource list and roadmap timeline.</p>
      </div>

      {/* Level */}
      <div className="step-section">
        <h3 className="section-label"><BookOpen size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Current Level</h3>
        <div className="level-cards stagger">
          {LEVELS.map(l => (
            <div
              key={l.id}
              className={`level-card anim-fade-up ${level === l.id ? 'selected' : ''}`}
              onClick={() => setLevel(l.id)}
              style={{ '--accent': l.color }}
            >
              <span className="level-emoji">{l.emoji}</span>
              <div>
                <div className="level-name" style={{ color: level === l.id ? l.color : 'var(--pp-text-main)' }}>{l.label}</div>
                <p className="level-desc">{l.desc}</p>
              </div>
              {level === l.id && <div className="level-check" style={{ background: l.color }}>✓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Time commitment */}
      <div className="step-section">
        <h3 className="section-label"><Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Daily Time Commitment</h3>
        <div className="time-grid stagger">
          {TIME_OPTIONS.map(t => (
            <div
              key={t.id}
              className={`time-card anim-fade-up ${time === t.id ? 'selected' : ''}`}
              onClick={() => setTime(t.id)}
            >
              <span className="time-icon">{t.icon}</span>
              <div className="time-label">{t.label}</div>
              <div className="time-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning style */}
      <div className="step-section">
        <h3 className="section-label"><Flame size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />How do you like to learn? <span className="text-muted text-xs">(pick any)</span></h3>
        <div className="choice-grid stagger">
          {STYLES.map(s => (
            <div
              key={s}
              className={`choice-card anim-fade-up ${style.includes(s) ? 'selected' : ''}`}
              onClick={() => toggleStyle(s)}
            >
              <span className="choice-emoji">{s.split(' ')[0]}</span>
              <span>{s.slice(3)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="step-footer">
        <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={!level || !time}>
          See Curated Resources <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
