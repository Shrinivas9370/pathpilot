import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getResourcesByCareer } from '../data/resources';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import './Steps.css';

const TAB_LABELS = ['📚 Courses', '🛠️ Platforms', '🏗️ Projects'];

export default function Step7_Resources() {
  const navigate = useNavigate();
  const { selectedCareer, saveStepData } = useUser();
  const [tab, setTab] = useState(0);
  const [bookmarked, setBookmarked] = useState([]);

  const resources = selectedCareer ? getResourcesByCareer(selectedCareer.id) : null;

  const toggle = (name) => setBookmarked(b => b.includes(name) ? b.filter(x => x !== name) : [...b, name]);

  const handleNext = () => {
    saveStepData(7, { bookmarked, careerId: selectedCareer?.id });
    navigate('/journey/8');
  };

  if (!resources) {
    return (
      <div className="step-page anim-fade-up">
        <div className="step-header">
          <div className="step-tag">Step 7 · Resources</div>
          <h1 className="step-title">No career selected</h1>
          <button className="btn btn-outline" onClick={() => navigate('/journey/4')}>← Go back to matching</button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 7 · Resource Engine</div>
        <h1 className="step-title">Your curated <span className="gradient-text">resources</span></h1>
        <p className="step-desc">
          Hand-picked for <strong style={{ color: 'var(--pp-primary-light)' }}>{selectedCareer?.title}</strong>. 
          Bookmark what you'll use — they'll appear in your final roadmap.
        </p>
      </div>

      {/* Tabs */}
      <div className="resource-tabs mb-6">
        {TAB_LABELS.map((t, i) => (
          <button key={t} className={`resource-tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {/* Courses */}
      {tab === 0 && (
        <div className="resources-list stagger">
          {resources.courses.map((course, i) => (
            <div className="resource-card anim-fade-up" key={course.name} style={{ '--i': i }}>
              <div className="resource-card-left">
                <div className="resource-icon-wrap">📖</div>
                <div>
                  <div className="resource-name">{course.name}</div>
                  <div className="resource-platform">📍 {course.platform}</div>
                  <div className="flex gap-2 mt-1">
                    <span className={`badge ${course.free ? 'badge-success' : 'badge-gold'}`}>
                      {course.free ? '✓ Free' : '💳 Paid'}
                    </span>
                    <span className="badge badge-primary">{course.level}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button className={`btn btn-icon ${bookmarked.includes(course.name) ? 'bookmarked' : ''}`} onClick={() => toggle(course.name)}>
                  <Star size={16} fill={bookmarked.includes(course.name) ? 'currentColor' : 'none'} />
                </button>
                <a href={course.url} className="btn btn-outline btn-sm">
                  Open <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Platforms */}
      {tab === 1 && (
        <div className="platforms-grid stagger">
          {resources.platforms.map((plat, i) => (
            <div className="platform-card anim-fade-up" key={plat.name} style={{ '--i': i }}>
              <div className="platform-icon">{plat.icon}</div>
              <div className="platform-name">{plat.name}</div>
              <div className="platform-type badge badge-primary">{plat.type}</div>
              <p className="platform-desc">{plat.description}</p>
              <button
                className={`btn btn-sm ${bookmarked.includes(plat.name) ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => toggle(plat.name)}
              >
                {bookmarked.includes(plat.name) ? '★ Saved' : '☆ Save'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {tab === 2 && (
        <div className="resources-list stagger">
          {resources.projects.map((proj, i) => (
            <div className="resource-card anim-fade-up" key={proj.title} style={{ '--i': i }}>
              <div className="resource-card-left">
                <div className="resource-icon-wrap project-num" style={{ background: selectedCareer?.gradient }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="resource-name">{proj.title}</div>
                  <div className="resource-platform">🛠️ {proj.tech}</div>
                  <div className="flex gap-2 mt-1">
                    <span className={`badge ${proj.difficulty === 'Beginner' ? 'badge-success' : proj.difficulty === 'Intermediate' ? 'badge-primary' : 'badge-pink'}`}>
                      {proj.difficulty}
                    </span>
                    <span className="badge badge-teal">⏱ {proj.duration}</span>
                  </div>
                </div>
              </div>
              <button className={`btn btn-icon ${bookmarked.includes(proj.title) ? 'bookmarked' : ''}`} onClick={() => toggle(proj.title)}>
                <Star size={16} fill={bookmarked.includes(proj.title) ? 'currentColor' : 'none'} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="step-footer">
        {bookmarked.length > 0 && (
          <div className="text-sm text-sub">✓ {bookmarked.length} resource{bookmarked.length > 1 ? 's' : ''} saved for your roadmap</div>
        )}
        <button className="btn btn-primary btn-lg" onClick={handleNext}>
          Build My Project Roadmap <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
