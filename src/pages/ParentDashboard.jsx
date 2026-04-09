import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CAREERS } from '../data/careers';
import { Compass, Heart, Shield, TrendingUp, AlertTriangle, ArrowRight, BookOpen, Users } from 'lucide-react';
import './Dashboard.css';

const SAFE_CAREERS = ['data-analyst', 'cloud-engineer', 'sde'];
const RISK_CAREERS = ['ai-engineer', 'ux-designer'];

const GUIDANCE_TIPS = [
  { icon: '🗺️', title: 'Ask about their interests first', desc: 'Let them explore before pushing a specific path. Interest → motivation → success.' },
  { icon: '📊', title: 'Look at demand, not just salary', desc: 'High demand = job security. AI and Cloud have 90%+ demand scores.' },
  { icon: '⏱️', title: 'Realistic timelines matter', desc: 'Most roles take 6–12 months of dedicated learning. Set realistic expectations.' },
  { icon: '🤝', title: 'Support the journey, not the destination', desc: 'Your child needs encouragement through all 9 steps, not just the outcome.' },
];

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { profile, completedSteps, selectedCareer, matchedCareers } = useUser();

  const progress = Math.round((completedSteps.length / 9) * 100);
  const childName = profile.name || 'Your child';

  return (
    <div className="dashboard-wrap">
      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{ borderRight: '1px solid rgba(236,72,153,0.15)' }}>
        <div className="dash-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="dash-logo" style={{ background: 'var(--grad-secondary)' }}><Compass size={18} /></div>
          <span>PathPilot</span>
        </div>
        <nav className="dash-nav">
          <button className="dash-nav-item active">
            <Heart size={18} style={{ color: 'var(--pp-secondary-light)' }} /> <span>Parent View</span>
          </button>
          <button className="dash-nav-item" onClick={() => navigate('/student')}>
            <Users size={18} /> <span>Child Dashboard</span>
          </button>
          <button className="dash-nav-item" onClick={() => navigate('/journey/1')}>
            <BookOpen size={18} /> <span>Start Journey</span>
          </button>
        </nav>
        <div className="dash-sidebar-footer">
          <div className="dash-user-card">
            <div className="dash-avatar" style={{ background: 'var(--grad-secondary)' }}>P</div>
            <div>
              <div className="dash-user-name">Parent</div>
              <div className="dash-user-role">Guardian View</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="dashboard-main">
        <div className="dash-header">
          <div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>
              <Heart size={22} style={{ color: 'var(--pp-secondary)', display: 'inline', marginRight: '0.5rem' }} />
              Parent Dashboard
            </h1>
            <p style={{ color: 'var(--pp-text-muted)', fontSize: '0.85rem', margin: 0 }}>
              Tracking {childName}'s career discovery journey
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/journey/1')}>
            Start Journey for Child <ArrowRight size={14} />
          </button>
        </div>

        {/* Child Progress Card */}
        <div className="dash-progress-card" style={{ borderColor: 'rgba(236,72,153,0.25)' }}>
          <div className="dash-prog-info">
            <div>
              <div className="dash-prog-label">{childName}'s Progress</div>
              <div className="dash-prog-value" style={{ color: 'var(--pp-secondary-light)' }}>{progress}% of journey complete</div>
            </div>
            <div className="dash-prog-step" style={{ color: 'var(--pp-secondary-light)' }}>Step {Math.min(completedSteps.length + 1, 9)} / 9</div>
          </div>
          <div className="progress-track" style={{ height: '10px', marginTop: '1rem' }}>
            <div className="progress-fill" style={{ width: `${progress}%`, background: 'var(--grad-secondary)' }} />
          </div>
          <div className="dash-step-bubbles">
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className={`step-bubble ${completedSteps.includes(i + 1) ? 'done' : ''}`}
                style={completedSteps.includes(i + 1) ? { background: 'rgba(236,72,153,0.2)', borderColor: 'var(--pp-secondary)', color: 'var(--pp-secondary-light)' } : {}}
              >
                {completedSteps.includes(i + 1) ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="dash-grid">
          <div className="dash-left">
            {/* Child's selected career */}
            {selectedCareer ? (
              <div className="dash-section">
                <h3 className="dash-section-title">Child's Current Focus</h3>
                <div className="career-spotlight" style={{ background: selectedCareer.gradient }}>
                  <div className="career-spotlight-overlay" />
                  <div className="career-spotlight-content">
                    <span className="career-spot-emoji">{selectedCareer.emoji}</span>
                    <div>
                      <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>{selectedCareer.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '0.8rem' }}>{selectedCareer.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dash-section">
                <h3 className="dash-section-title">Child's Career Path</h3>
                <div className="dash-empty-state" onClick={() => navigate('/journey/1')}>
                  <BookOpen size={28} style={{ color: 'var(--pp-secondary-light)' }} />
                  <p>Journey not started yet. Start it for your child!</p>
                  <button className="btn btn-secondary btn-sm">Begin Journey</button>
                </div>
              </div>
            )}

            {/* Safe vs Risk Analysis */}
            <div className="dash-section">
              <h3 className="dash-section-title"><Shield size={16} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--pp-accent)' }} />Career Risk Analysis</h3>
              
              <div className="risk-section mb-4">
                <div className="risk-header safe-header">
                  <Shield size={16} /> <span>✅ Safe & High-Demand Careers</span>
                </div>
                <div className="risk-list">
                  {CAREERS.filter(c => SAFE_CAREERS.includes(c.id)).map(c => (
                    <div key={c.id} className="risk-item risk-safe" onClick={() => navigate(`/career/${c.id}`)}>
                      <span>{c.emoji}</span>
                      <div className="risk-item-info">
                        <div className="font-medium text-sm">{c.title}</div>
                        <div className="text-xs text-muted">{c.salary.min}–{c.salary.max} {c.salary.currency} · {c.demand}% demand</div>
                      </div>
                      <span className="badge badge-success">Safe</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="risk-section">
                <div className="risk-header risky-header">
                  <AlertTriangle size={16} /> <span>⚡ High Reward, Higher Effort</span>
                </div>
                <div className="risk-list">
                  {CAREERS.filter(c => RISK_CAREERS.includes(c.id)).map(c => (
                    <div key={c.id} className="risk-item risk-risky" onClick={() => navigate(`/career/${c.id}`)}>
                      <span>{c.emoji}</span>
                      <div className="risk-item-info">
                        <div className="font-medium text-sm">{c.title}</div>
                        <div className="text-xs text-muted">Difficulty: {c.difficulty}/5 · {c.timeline}</div>
                      </div>
                      <span className="badge badge-gold">High Effort</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="dash-right">
            {/* Guidance Tips */}
            <div className="dash-section">
              <h3 className="dash-section-title">💡 Parent Guidance Tips</h3>
              <div className="guidance-list">
                {GUIDANCE_TIPS.map(tip => (
                  <div key={tip.title} className="guidance-tip">
                    <span className="guidance-icon">{tip.icon}</span>
                    <div>
                      <div className="guidance-title">{tip.title}</div>
                      <div className="guidance-desc">{tip.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All careers overview */}
            <div className="dash-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="dash-section-title" style={{ margin: 0 }}>
                  <TrendingUp size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />Demand Comparison
                </h3>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/compare')}>
                  Full Compare <ArrowRight size={14} />
                </button>
              </div>
              <div className="demand-breakdown">
                {[...CAREERS].sort((a, b) => b.demand - a.demand).slice(0, 5).map(c => (
                  <div key={c.id} className="demand-item" onClick={() => navigate(`/career/${c.id}`)}>
                    <span className="demand-emoji">{c.emoji}</span>
                    <div className="demand-info">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{c.title.split(' ').slice(0, 2).join(' ')}</span>
                        <span className="text-xs font-semibold" style={{ color: c.color }}>{c.demand}%</span>
                      </div>
                      <div className="progress-track" style={{ height: '5px' }}>
                        <div className="progress-fill" style={{ width: `${c.demand}%`, background: c.gradient }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
