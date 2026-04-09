import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getResourcesByCareer } from '../data/resources';
import { Compass, Download, Share2, ArrowRight, CheckCircle, Sparkles, Calendar, BookOpen, Code2, Briefcase } from 'lucide-react';
import './Steps.css';

const MONTHS = [
  { range: 'Month 1–2', phase: 'Foundation', icon: <BookOpen size={18} />, color: '#14b8a6', description: 'Learn fundamentals and core concepts' },
  { range: 'Month 3–5', phase: 'Building', icon: <Code2 size={18} />, color: '#6366f1', description: 'Build real projects and grow your portfolio' },
  { range: 'Month 6', phase: 'Launch', icon: <Briefcase size={18} />, color: '#ec4899', description: 'Internship prep, networking, job applications' },
];

export default function Step9_FinalRoadmap() {
  const navigate = useNavigate();
  const { selectedCareer, profile, saveStepData, stepData } = useUser();
  const [copied, setCopied] = useState(false);

  const resources = selectedCareer ? getResourcesByCareer(selectedCareer.id) : null;
  const projects = stepData[8]?.selectedProjects || [];
  const level = stepData[6]?.level || 'beginner';
  const time = stepData[6]?.time || '2h';

  const monthDetails = selectedCareer ? [
    { ...MONTHS[0], tasks: [selectedCareer.month1_2, 'Set up dev environment', 'Complete 2 foundational courses'] },
    { ...MONTHS[1], tasks: [selectedCareer.month3_5, ...projects.slice(0, 2).map(p => `Build: ${p}`)] },
    { ...MONTHS[2], tasks: [selectedCareer.month6, 'Apply to 10+ internships', 'Polish GitHub + LinkedIn'] },
  ] : MONTHS.map((m, i) => ({ ...m, tasks: ['Complete this step first'] }));

  const weeklyPlan = [
    { day: 'Mon–Tue', task: 'Course learning + notes', icon: '📖' },
    { day: 'Wed–Thu', task: 'Practice problems + coding', icon: '💻' },
    { day: 'Fri–Sat', task: 'Project work + building', icon: '🛠️' },
    { day: 'Sunday', task: 'Review + plan next week', icon: '🔄' },
  ];

  const handleFinish = () => {
    saveStepData(9, { generated: true, career: selectedCareer?.id });
    navigate('/student');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`PathPilot Roadmap for ${selectedCareer?.title || 'Tech Career'}\n\nGenerated at pathpilot.ai`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="step-page anim-fade-up">
      {/* WOW Header */}
      <div className="step9-hero">
        <div className="step9-glow" />
        <Sparkles size={32} className="step9-sparkle anim-float" style={{ color: 'var(--pp-gold)' }} />
        <div className="step-tag" style={{ margin: '1rem auto' }}>Step 9 · Your Final Roadmap 🚀</div>
        <h1 className="step9-title">
          {profile.name ? `${profile.name}'s` : 'Your'} Personalized<br />
          <span className="gradient-text">{selectedCareer?.title || 'Tech Career'} Roadmap</span>
        </h1>
        <p className="step9-subtitle">
          Based on your unique profile — here's your complete {level} roadmap with {time}/day commitment.
        </p>
        <div className="step9-career-pill" style={{ background: selectedCareer?.gradient }}>
          {selectedCareer?.emoji} {selectedCareer?.title}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="summary-cards stagger">
        <div className="summary-card anim-fade-up">
          <div className="summary-label">Level</div>
          <div className="summary-value">{level === 'beginner' ? '🌱 Beginner' : level === 'intermediate' ? '⚡ Intermediate' : '🔥 Advanced'}</div>
        </div>
        <div className="summary-card anim-fade-up">
          <div className="summary-label">Daily Time</div>
          <div className="summary-value">⏰ {time}/day</div>
        </div>
        <div className="summary-card anim-fade-up">
          <div className="summary-label">Projects</div>
          <div className="summary-value">🛠️ {projects.length} planned</div>
        </div>
        <div className="summary-card anim-fade-up">
          <div className="summary-label">Target Salary</div>
          <div className="summary-value">{selectedCareer ? `💰 ${selectedCareer.salary.min}–${selectedCareer.salary.max} LPA` : '–'}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="step-section">
        <h3 className="section-label"><Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />6-Month Timeline</h3>
        <div className="timeline-container">
          {monthDetails.map((month, i) => (
            <div className="timeline-item anim-fade-up" key={month.range} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="timeline-connector" style={{ background: month.color }} />
              <div className="timeline-dot" style={{ background: month.color, boxShadow: `0 0 12px ${month.color}60` }} />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-icon" style={{ background: month.color + '20', color: month.color }}>
                    {month.icon}
                  </div>
                  <div>
                    <div className="timeline-phase" style={{ color: month.color }}>{month.phase}</div>
                    <div className="timeline-range">{month.range}</div>
                  </div>
                </div>
                <div className="timeline-tasks">
                  {month.tasks.map(task => (
                    <div key={task} className="timeline-task">
                      <CheckCircle size={13} style={{ color: month.color, minWidth: '13px' }} />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="step-section">
        <h3 className="section-label">📅 Weekly Study Plan</h3>
        <div className="weekly-grid stagger">
          {weeklyPlan.map((w, i) => (
            <div className="weekly-card anim-fade-up" key={w.day} style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="weekly-icon">{w.icon}</span>
              <div className="weekly-day">{w.day}</div>
              <div className="weekly-task">{w.task}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills to Learn */}
      {selectedCareer?.skills && (
        <div className="step-section">
          <h3 className="section-label">🧠 Skills Roadmap</h3>
          <div className="skills-roadmap">
            {selectedCareer.skills.map((skill, i) => (
              <div className="skill-roadmap-item anim-fade-up" key={skill} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="skill-roadmap-bar" style={{ background: selectedCareer.gradient, width: `${100 - i * 12}%` }} />
                <div className="skill-roadmap-label">
                  <span>{skill}</span>
                  <span className="text-xs text-muted">Month {Math.min(i + 1, 6)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources quick-ref */}
      {resources && (
        <div className="step-section">
          <h3 className="section-label">📚 Top Resources</h3>
          <div className="roadmap-resources stagger">
            {resources.courses.slice(0, 3).map((c, i) => (
              <div className="roadmap-resource-item anim-fade-up" key={c.name} style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="roadmap-resource-num" style={{ background: selectedCareer?.gradient }}>{i + 1}</span>
                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-muted">{c.platform} · {c.free ? 'Free' : 'Paid'}</div>
                </div>
                <span className={`badge ${c.free ? 'badge-success' : 'badge-gold'}`}>{c.free ? 'Free' : '💳'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="step9-actions">
        <button className="btn btn-outline" onClick={handleCopy}>
          {copied ? '✓ Copied!' : <><Share2 size={16} /> Share Roadmap</>}
        </button>
        <button className="btn btn-outline" onClick={() => window.print()}>
          <Download size={16} /> Save as PDF
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleFinish}>
          <Compass size={18} /> Go to Dashboard
        </button>
      </div>

      {/* Congrats footer */}
      <div className="step9-congrats anim-fade-up">
        <Sparkles size={18} style={{ color: 'var(--pp-gold)' }} />
        <span>You've completed the PathPilot journey! Your roadmap is ready. Now go build it. 🚀</span>
      </div>
    </div>
  );
}
