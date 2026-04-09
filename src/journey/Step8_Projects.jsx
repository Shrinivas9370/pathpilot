import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getResourcesByCareer } from '../data/resources';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './Steps.css';

export default function Step8_Projects() {
  const navigate = useNavigate();
  const { selectedCareer, saveStepData } = useUser();
  const [selected, setSelected] = useState([]);

  const resources = selectedCareer ? getResourcesByCareer(selectedCareer.id) : null;
  const projects = resources?.projects || [];

  const toggle = (title) =>
    setSelected(s => s.includes(title) ? s.filter(x => x !== title) : [...s, title]);

  const handleNext = () => {
    saveStepData(8, { selectedProjects: selected });
    navigate('/journey/9');
  };

  const DIFF_COLOR = { Beginner: 'badge-success', Intermediate: 'badge-primary', Advanced: 'badge-pink' };

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 8 · Project Roadmap</div>
        <h1 className="step-title">Pick your <span className="gradient-text">projects</span></h1>
        <p className="step-desc">Select the projects you want to build. These will anchor your learning roadmap — start small, go big.</p>
      </div>

      <div className="projects-philosophy">
        <span>💡</span>
        <span>Projects are your portfolio. Each one you build is proof of your skills to future employers.</span>
      </div>

      {/* Project cards */}
      <div className="projects-grid stagger">
        {projects.map((proj, i) => {
          const isSelected = selected.includes(proj.title);
          return (
            <div
              key={proj.title}
              className={`project-select-card anim-fade-up ${isSelected ? 'selected' : ''}`}
              onClick={() => toggle(proj.title)}
              style={{ '--i': i, '--accent': selectedCareer?.color }}
            >
              {isSelected && <div className="project-check-overlay"><CheckCircle size={22} /></div>}
              <div className="project-number" style={{ background: selectedCareer?.gradient }}>
                P{String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="project-card-title">{proj.title}</h3>
              <div className="flex gap-2 flex-wrap mt-2 mb-3">
                <span className={`badge ${DIFF_COLOR[proj.difficulty] || 'badge-primary'}`}>{proj.difficulty}</span>
                <span className="badge badge-teal">⏱ {proj.duration}</span>
              </div>
              <div className="project-tech-row">
                <span className="text-xs text-muted">Tech stack:</span>
                <span className="text-xs font-medium" style={{ color: 'var(--pp-text-sub)' }}>{proj.tech}</span>
              </div>
              <div className="project-sequence">
                {i === 0 && <span className="badge badge-success">Start here</span>}
                {i === projects.length - 1 && <span className="badge badge-pink">Capstone 🔥</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Build order tip */}
      {selected.length >= 2 && (
        <div className="build-order-tip anim-fade-up">
          <h4>📋 Your build order</h4>
          <div className="build-order-list">
            {projects
              .filter(p => selected.includes(p.title))
              .map((p, i) => (
                <div key={p.title} className="build-order-item">
                  <span className="build-num" style={{ background: selectedCareer?.gradient }}>{i + 1}</span>
                  <span>{p.title}</span>
                  <span className="text-xs text-muted">→ {p.duration}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="step-footer">
        <div className="text-sm text-sub">
          {selected.length === 0 ? 'Select at least 1 project to continue' : `${selected.length} project${selected.length > 1 ? 's' : ''} selected`}
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={selected.length === 0}>
          Generate My Final Roadmap 🚀 <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
