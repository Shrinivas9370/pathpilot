import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Compass, ChevronLeft, X } from 'lucide-react';
import './JourneyLayout.css';

const STEPS = [
  { n: 1, label: 'Self Discovery',    emoji: '🧠' },
  { n: 2, label: 'Skill Assessment',  emoji: '⚡' },
  { n: 3, label: 'Career Awareness',  emoji: '🔍' },
  { n: 4, label: 'AI Matching',       emoji: '🤖' },
  { n: 5, label: 'Deep Dive',         emoji: '🎯' },
  { n: 6, label: 'Learning Path',     emoji: '📖' },
  { n: 7, label: 'Resources',         emoji: '📚' },
  { n: 8, label: 'Projects',          emoji: '🛠️' },
  { n: 9, label: 'Your Roadmap',      emoji: '🚀' },
];

export default function JourneyLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completedSteps } = useUser();

  const currentStep = parseInt(location.pathname.split('/').pop()) || 1;
  const progress = ((currentStep - 1) / 8) * 100;

  return (
    <div className="journey-wrap">
      {/* Sidebar */}
      <aside className="journey-sidebar">
        <div className="journey-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Compass size={22} />
          <span>PathPilot</span>
        </div>

        <div className="journey-steps-list">
          {STEPS.map(s => {
            const isDone = completedSteps.includes(s.n);
            const isActive = s.n === currentStep;
            const isLocked = s.n > currentStep && !isDone;
            return (
              <button
                key={s.n}
                className={`journey-step-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => !isLocked && navigate(`/journey/${s.n}`)}
                disabled={isLocked}
              >
                <div className="step-indicator">
                  {isDone ? '✓' : s.n}
                </div>
                <div className="step-meta">
                  <span className="step-name">{s.label}</span>
                  <span className="step-emoji">{s.emoji}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button className="journey-exit-btn" onClick={() => navigate('/')}>
          <X size={16} /> Exit journey
        </button>
      </aside>

      {/* Main Content */}
      <div className="journey-main">
        {/* Top Progress Bar */}
        <div className="journey-topbar">
          {currentStep > 1 && (
            <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/journey/${currentStep - 1}`)}>
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <div className="journey-progress-wrap">
            <div className="journey-progress-info">
              <span className="text-sm text-sub">Step {currentStep} of 9</span>
              <span className="text-sm text-muted">{Math.round(progress)}% complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="step-badge">
            {STEPS[currentStep - 1]?.emoji} {STEPS[currentStep - 1]?.label}
          </div>
        </div>

        {/* Step Content */}
        <div className="journey-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
