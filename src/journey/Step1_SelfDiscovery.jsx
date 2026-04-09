import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowRight } from 'lucide-react';
import './Steps.css';

const INTERESTS = [
  { emoji: '💻', label: 'Coding & Dev' },
  { emoji: '🤖', label: 'AI & Machine Learning' },
  { emoji: '📊', label: 'Data & Analytics' },
  { emoji: '🎨', label: 'Design & UI/UX' },
  { emoji: '🛡️', label: 'Cybersecurity' },
  { emoji: '☁️', label: 'Cloud & DevOps' },
  { emoji: '📱', label: 'Mobile Apps' },
  { emoji: '🎮', label: 'Game Dev' },
  { emoji: '🔬', label: 'Research & Science' },
  { emoji: '💼', label: 'Business & Startups' },
  { emoji: '🎯', label: 'Problem Solving' },
  { emoji: '🌐', label: 'Networking & Infra' },
];

const PERSONALITIES = [
  { emoji: '🔍', label: 'Analytical' },
  { emoji: '💡', label: 'Creative' },
  { emoji: '🤝', label: 'Collaborative' },
  { emoji: '🦅', label: 'Independent' },
  { emoji: '📋', label: 'Detail-Oriented' },
  { emoji: '🚀', label: 'Ambitious' },
  { emoji: '🧘', label: 'Patient & Methodical' },
  { emoji: '⚡', label: 'Fast-paced & Dynamic' },
];

export default function Step1_SelfDiscovery() {
  const navigate = useNavigate();
  const { updateProfile, saveStepData, profile } = useUser();

  const [name, setName] = useState(profile.name || '');
  const [classYear, setClassYear] = useState(profile.class || '');
  const [selectedInterests, setSelectedInterests] = useState(profile.interests || []);
  const [selectedPersonality, setSelectedPersonality] = useState(profile.personality || []);
  const [goal, setGoal] = useState('');

  const toggleInterest = (label) => {
    setSelectedInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const togglePersonality = (label) => {
    setSelectedPersonality(prev =>
      prev.includes(label) ? prev.filter(p => p !== label) : [...prev, label]
    );
  };

  const handleNext = () => {
    updateProfile({ name, class: classYear, interests: selectedInterests, personality: selectedPersonality });
    saveStepData(1, { name, class: classYear, interests: selectedInterests, personality: selectedPersonality, goal });
    navigate('/journey/2');
  };

  const canProceed = name.trim().length > 0;

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 1 · Self Discovery</div>
        <h1 className="step-title">Let's understand <span className="gradient-text">who you are</span></h1>
        <p className="step-desc">Tell us about yourself. This helps us personalize your entire journey.</p>
      </div>

      {/* Basic Info */}
      <div className="step-section">
        <h3 className="section-label">Basic Info</h3>
        <div className="grid-2" style={{ gap: '0.75rem' }}>
          <div>
            <label className="field-label">Your Name</label>
            <input className="input" placeholder="e.g. Aryan Sharma" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Class / Year</label>
            <select className="input" value={classYear} onChange={e => setClassYear(e.target.value)}>
              <option value="">Select your class</option>
              <option value="10th">Class 10 (High School)</option>
              <option value="11th">Class 11</option>
              <option value="12th">Class 12</option>
              <option value="1st-year">1st Year College</option>
              <option value="2nd-year">2nd Year College</option>
              <option value="3rd-year">3rd Year College</option>
              <option value="4th-year">4th Year / Final</option>
              <option value="graduate">Graduate / Working</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="step-section">
        <h3 className="section-label">What interests you? <span className="text-muted text-xs">(optional)</span></h3>
        <div className="choice-grid stagger">
          {INTERESTS.map(i => (
            <div
              key={i.label}
              className={`choice-card anim-fade-up ${selectedInterests.includes(i.label) ? 'selected' : ''}`}
              onClick={() => toggleInterest(i.label)}
            >
              <span className="choice-emoji">{i.emoji}</span>
              <span>{i.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div className="step-section">
        <h3 className="section-label">Your personality traits <span className="text-muted text-xs">(optional)</span></h3>
        <div className="choice-grid stagger">
          {PERSONALITIES.map(p => (
            <div
              key={p.label}
              className={`choice-card anim-fade-up ${selectedPersonality.includes(p.label) ? 'selected' : ''}`}
              onClick={() => togglePersonality(p.label)}
            >
              <span className="choice-emoji">{p.emoji}</span>
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="step-section">
        <h3 className="section-label">What's your career goal? <span className="text-muted text-xs">(optional)</span></h3>
        <input className="input" placeholder="e.g. Get a job at a top tech company..." value={goal} onChange={e => setGoal(e.target.value)} />
      </div>

      <div className="step-footer">
        {selectedInterests.length > 0 && (
          <div className="selection-summary">
            {selectedInterests.slice(0, 3).map(i => <span key={i} className="badge badge-primary">{i}</span>)}
            {selectedInterests.length > 3 && <span className="badge badge-primary">+{selectedInterests.length - 3} more</span>}
          </div>
        )}
        <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={!canProceed}>
          Continue to Skill Assessment <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
