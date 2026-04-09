import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CAREERS } from '../data/careers';
import { COURSES } from '../data/courses';
import {
  Compass, LayoutDashboard, GitMerge, BookmarkCheck, ArrowRight,
  Sparkles, TrendingUp, Clock, Play, User, RefreshCw, BookOpen, LogOut, CheckCircle2, MinusCircle, GitCompare
} from 'lucide-react';
import './Dashboard.css';
import './Dashboard-courses.css';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/student' },
  { icon: <GitMerge size={18} />, label: 'My Roadmap', path: '/journey/9' },
  { icon: <GitCompare size={18} />, label: 'Compare', path: '/compare' },
  { icon: <BookmarkCheck size={18} />, label: 'Saved Careers', path: '/student' },
  { icon: <User size={18} />, label: 'Profile', path: '/student' },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { profile, completedSteps, selectedCareer, savedCareers, matchedCareers, currentStep, resetJourney, username, enrolledCourses, enrollCourse, unenrollCourse, logout } = useUser();

  const progress = Math.round((completedSteps.length / 9) * 100);
  const firstName = username || profile.name?.split(' ')[0] || 'Explorer';
  const hasStarted = completedSteps.length > 0;
  
  const handleLogout = () => {
    logout();
    navigate('/get-started');
  };

  const getEnrolledCourseData = () => {
    return COURSES.filter(c => enrolledCourses.includes(c.id));
  };
  const getAvailableCourseData = () => {
    return COURSES.filter(c => !enrolledCourses.includes(c.id));
  };

  return (
    <div className="dashboard-wrap">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dash-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="dash-logo"><Compass size={18} /></div>
          <span>PathPilot</span>
        </div>
        <nav className="dash-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.label} className="dash-nav-item active" onClick={() => navigate(item.path)}>
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="dash-sidebar-footer">
          <div className="dash-user-card">
            <div className="dash-avatar">{firstName[0]?.toUpperCase()}</div>
            <div>
              <div className="dash-user-name">{firstName}</div>
              <div className="dash-user-role">Student</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleLogout}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>
              Welcome back, <span className="gradient-text">{firstName}</span> 👋
            </h1>
            <p style={{ color: 'var(--pp-text-muted)', fontSize: '0.85rem', margin: 0 }}>
              {hasStarted ? `You're on Step ${currentStep} of 9 — keep going!` : 'Start your career discovery journey below.'}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate(`/journey/${currentStep}`)}>
            {hasStarted ? <><Play size={15} /> Continue Journey</> : <><Sparkles size={15} /> Start Journey</>}
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Progress Card */}
        <div className="dash-progress-card">
          <div className="dash-prog-info">
            <div>
              <div className="dash-prog-label">Journey Progress</div>
              <div className="dash-prog-value">{progress}% Complete</div>
            </div>
            <div className="dash-prog-step">Step {Math.min(currentStep, 9)} / 9</div>
          </div>
          <div className="progress-track" style={{ height: '10px', marginTop: '1rem' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="dash-step-bubbles">
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className={`step-bubble ${completedSteps.includes(i + 1) ? 'done' : i + 1 === currentStep ? 'active' : ''}`}
                onClick={() => completedSteps.includes(i + 1) && navigate(`/journey/${i + 1}`)}
                title={`Step ${i + 1}`}
              >
                {completedSteps.includes(i + 1) ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="dash-section" style={{ marginTop: '2rem' }}>
          <h3 className="dash-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} className="text-purple" /> My Learning Path
          </h3>
          
          {enrolledCourses.length === 0 ? (
            <div className="dash-empty-state" style={{ background: 'rgba(107, 70, 193, 0.05)', border: '1px dashed var(--pp-primary)' }}>
              <BookOpen size={32} className="text-purple" style={{ marginBottom: '1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>You aren't enrolled in any courses yet</h4>
              <p style={{ color: 'var(--pp-text-muted)', marginBottom: '1.5rem', maxWidth: '400px' }}>
                Join a dynamic curriculum curated by industry experts and start building your real-world portfolio today.
              </p>
            </div>
          ) : (
            <div className="course-grid">
              {getEnrolledCourseData().map(course => (
                <div key={course.id} className="course-card enrolled">
                  <div className="course-gradient" style={{ background: course.gradient }} />
                  <div className="course-content">
                    <div className="course-header">
                      <span className="course-emoji">{course.icon}</span>
                      <span className="course-badge">Enrolled</span>
                    </div>
                    <h4>{course.title}</h4>
                    <p className="course-instructor">by {course.instructor}</p>
                    <div className="course-meta">
                      <span><Clock size={12}/> {course.duration}</span>
                      <span><TrendingUp size={12}/> {course.level}</span>
                    </div>
                    <button className="btn btn-outline btn-sm course-action unenroll" onClick={() => unenrollCourse(course.id)}>
                      <MinusCircle size={14} /> Unenroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h3 className="dash-section-title" style={{ marginTop: '2rem' }}>Available Courses</h3>
          <div className="course-grid">
            {getAvailableCourseData().map(course => (
              <div key={course.id} className="course-card available">
                <div className="course-gradient" style={{ background: course.gradient }} />
                <div className="course-content">
                  <div className="course-header">
                    <span className="course-emoji">{course.icon}</span>
                  </div>
                  <h4>{course.title}</h4>
                  <p className="course-instructor">by {course.instructor}</p>
                  <div className="course-meta">
                    <span><Clock size={12}/> {course.duration}</span>
                    <span><TrendingUp size={12}/> {course.level}</span>
                  </div>
                  <button className="btn btn-primary btn-sm course-action enroll" onClick={() => enrollCourse(course.id)}>
                    <CheckCircle2 size={14} /> Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-grid" style={{ marginTop: '2rem' }}>
          {/* Left column */}
          <div className="dash-left">
            {/* Selected Career */}
            {selectedCareer ? (
              <div className="dash-section">
                <h3 className="dash-section-title">Your Career Path</h3>
                <div className="career-spotlight" style={{ background: selectedCareer.gradient }}>
                  <div className="career-spotlight-overlay" />
                  <div className="career-spotlight-content">
                    <span className="career-spot-emoji">{selectedCareer.emoji}</span>
                    <div>
                      <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{selectedCareer.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', margin: 0 }}>{selectedCareer.tagline}</p>
                    </div>
                    <div className="career-spot-stats">
                      <div className="career-spot-stat">
                        <TrendingUp size={12} />{selectedCareer.demand}% demand
                      </div>
                      <div className="career-spot-stat">
                        <Clock size={12} />{selectedCareer.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dash-section">
                <h3 className="dash-section-title">Your Career Path</h3>
                <div className="dash-empty-state" onClick={() => navigate('/journey/1')}>
                  <Sparkles size={28} style={{ color: 'var(--pp-primary-light)' }} />
                  <p>Complete the journey to get your career match</p>
                  <button className="btn btn-primary btn-sm">Start Now</button>
                </div>
              </div>
            )}

            {/* Top Matches */}
            {matchedCareers.length > 0 && (
              <div className="dash-section">
                <h3 className="dash-section-title">Top Career Matches</h3>
                <div className="dash-match-list">
                  {matchedCareers.slice(0, 3).map((career, i) => (
                    <div key={career.id} className="dash-match-item" onClick={() => navigate(`/career/${career.id}`)}>
                      <span>{career.emoji}</span>
                      <div className="dash-match-info">
                        <div className="dash-match-name">{career.title}</div>
                        <div className="progress-track" style={{ height: '4px', marginTop: '4px' }}>
                          <div className="progress-fill" style={{ width: `${career.matchScore}%`, background: career.gradient }} />
                        </div>
                      </div>
                      <span className="dash-match-score" style={{ color: career.color }}>{career.matchScore}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="dash-right">
            {/* Quick Stats */}
            <div className="dash-section">
              <h3 className="dash-section-title">Your Stats</h3>
              <div className="quick-stats-grid">
                <div className="quick-stat">
                  <div className="quick-stat-val gradient-text">{completedSteps.length}</div>
                  <div className="quick-stat-label">Steps Done</div>
                </div>
                <div className="quick-stat">
                  <div className="quick-stat-val gradient-text-pink">{savedCareers.length}</div>
                  <div className="quick-stat-label">Saved Careers</div>
                </div>
                <div className="quick-stat">
                  <div className="quick-stat-val gradient-text-teal">{matchedCareers.length}</div>
                  <div className="quick-stat-label">Matches Found</div>
                </div>
                <div className="quick-stat">
                  <div className="quick-stat-val" style={{ color: 'var(--pp-gold)' }}>{progress}%</div>
                  <div className="quick-stat-label">Complete</div>
                </div>
              </div>
            </div>

            {/* Saved Careers */}
            <div className="dash-section">
              <h3 className="dash-section-title">Saved Careers</h3>
              {savedCareers.length > 0 ? (
                <div className="saved-careers-list">
                  {savedCareers.slice(0, 4).map(c => (
                    <div key={c.id} className="saved-career-item" onClick={() => navigate(`/career/${c.id}`)}>
                      <span className="saved-career-emoji">{c.emoji}</span>
                      <div>
                        <div className="font-medium text-sm">{c.title}</div>
                        <div className="text-xs text-muted">{c.salary.min}–{c.salary.max} {c.salary.currency}</div>
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--pp-text-muted)', marginLeft: 'auto' }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dash-empty-state-sm">
                  <BookmarkCheck size={20} style={{ color: 'var(--pp-text-muted)' }} />
                  <p style={{ margin: 0 }}>No saved careers yet</p>
                </div>
              )}
            </div>

            {/* Explore all careers */}
            <div className="dash-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="dash-section-title" style={{ margin: 0 }}>Explore Careers</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/compare')}>Compare <ArrowRight size={14} /></button>
              </div>
              <div className="explore-grid">
                {CAREERS.slice(0, 4).map(c => (
                  <div key={c.id} className="explore-card" onClick={() => navigate(`/career/${c.id}`)}>
                    <div className="explore-bar" style={{ background: c.gradient }} />
                    <span className="explore-emoji">{c.emoji}</span>
                    <div className="explore-name">{c.title.split(' ').slice(0, 2).join(' ')}</div>
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
