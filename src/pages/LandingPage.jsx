import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CAREERS } from '../data/careers';
import { Compass, Sparkles, CheckCircle2, Map, Users, Target, BookOpen, ArrowRight, Zap, Briefcase, TrendingUp, BarChart, Globe, Layout, ShieldCheck, GraduationCap } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setRole } = useUser();

  const handleStart = () => {
    navigate('/get-started');
  };

  const handleParent = () => {
    setRole('parent');
    navigate('/parent');
  };

  // Select top 3 trending careers
  const trendingCareers = CAREERS.filter(c => ['ai-engineer', 'cloud-engineer', 'data-analyst'].includes(c.id));

  return (
    <div className="landing">
      {/* Top Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="logo-section">
            <div className="logo-icon"><Compass size={18} /></div>
            <span className="logo-text">PathPilot AI</span>
          </div>
          
          <div className="nav-links">
            <button className="nav-link active">Home</button>
            <button className="nav-link" onClick={() => navigate('/roadmaps')}>Roadmaps</button>
            <button className="nav-link" onClick={() => navigate('/compare')}>Compare</button>
            <button className="nav-link" onClick={handleParent}>Parents</button>
            <button className="nav-link" onClick={() => navigate('/student')}>Dashboard</button>
          </div>

          <div className="nav-actions">
            <button className="btn btn-primary" onClick={handleStart}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} /> AI-Powered Career Guidance for CS Students
            </div>
            
            <h1 className="hero-title">
              Code Your <span className="text-purple">Path</span> &amp;<br/>
              Debug Your <span className="text-purple">Future</span>
            </h1>
            
            <p className="hero-subtitle">
              Get a personalized step-by-step guide based on your academic year and career goal. Stop guessing — start building your future with clarity.
            </p>
            
            <div className="hero-checks">
              <span><CheckCircle2 size={16} /> 10 Career Paths</span>
              <span><CheckCircle2 size={16} /> Structured Roadmaps</span>
              <span><CheckCircle2 size={16} /> Free Resources</span>
            </div>
          </div>
          
          {/* Right Card (Role Selection) */}
          <div className="role-grid">
            <div
              className={`role-card`}
              onClick={handleStart}
            >
              <div className="role-icon-wrap bg-purple"><span className="text-white">🎓</span></div>
              <h3>I'm a Student</h3>
              <p>Discover your ideal tech career via our 9-step guided journey.</p>
              <div className="role-cta text-purple">
                Start my journey <ArrowRight size={16} />
              </div>
            </div>

            <div
              className={`role-card`}
              onClick={handleParent}
            >
              <div className="role-icon-wrap bg-pink"><span className="text-white">👪</span></div>
              <h3>I'm a Parent</h3>
              <p>Track your child's progress and explore safe vs risky careers.</p>
              <div className="role-cta text-pink">
                Parent dashboard <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Elimination Confusion */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="section-pill"><Target size={14} /> Our Mission</div>
          <h2 className="mission-title">
            Helping students eliminate confusion <br />
            and choose the <span className="text-purple">right tech career path</span>
          </h2>
          <p className="mission-desc">
            With thousands of courses, frameworks, and conflicting advice out there, navigating a career in tech is overwhelming. Sequence brings clarity by mapping your personal strengths directly to industry demands.
          </p>
        </div>
      </section>

      {/* Everything You Need to Succeed Section */}
      <section className="everything-section">
        <div className="trending-header">
          <div className="section-pill"><Layout size={14} /> Features</div>
          <h2>Everything You Need to Succeed</h2>
          <p>We provide all the tools, resources, and structured milestones you need.</p>
        </div>
        
        <div className="everything-grid bento-grid">
          {/* Card 1: Guidance */}
          <div className="everything-card span-2">
            <div className="card-text">
              <h3>Smart Career Guidance</h3>
              <p>AI-curated paths tailored to your specific academic year, skills, and personal interests.</p>
            </div>
            <div className="widget-preview">
              <div className="widget-match">
                <div className="match-circle">98%</div>
                <div className="match-details">
                  <div className="match-title">AI Engineer</div>
                  <div className="match-tags">
                    <span className="m-tag">Python</span><span className="m-tag">Math</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Roadmaps */}
          <div className="everything-card span-2">
            <div className="card-text">
              <h3>Targeted Roadmaps</h3>
              <p>Clear, actionable monthly milestones taking you exactly from absolute beginner to job-ready.</p>
            </div>
            <div className="widget-preview flex-center">
              <div className="widget-timeline">
                <div className="w-step done"><CheckCircle2 size={12}/> Month 1: Basics</div>
                <div className="w-step done"><CheckCircle2 size={12}/> Month 2: APIs</div>
                <div className="w-step active"><span className="pulse"></span> Month 3: Fullstack</div>
              </div>
            </div>
          </div>

          {/* Card 3: Projects */}
          <div className="everything-card span-2">
            <div className="card-text">
              <h3>Project-Based Learning</h3>
              <p>Don't just watch videos. Build real-world portfolio projects that actually impress recruiters.</p>
            </div>
            <div className="widget-preview code-editor">
              <div className="code-header"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span></div>
              <div className="code-body">
                <div className="code-line"><span className="c-purple">import</span> React <span className="c-purple">from</span> <span className="c-green">'react'</span>;</div>
                <div className="code-line"><span className="c-purple">export default function</span> App() {'{'}</div>
                <div className="code-line indent"><span className="c-purple">return</span> {'<'}Portfolio {'/>'};</div>
                <div className="code-line">{'}'}</div>
              </div>
            </div>
          </div>

          {/* Card 4: Dashboard */}
          <div className="everything-card span-2">
            <div className="card-text">
              <h3>Parental Dashboard</h3>
              <p>A dedicated portal for parents to monitor progress, understand the industry, and see risk metrics.</p>
            </div>
            <div className="widget-preview">
              <div className="widget-chart">
                <div className="chart-bar" style={{height: '40%'}}></div>
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '35%'}}></div>
                <div className="chart-bar" style={{height: '90%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Scope Section */}
      <section className="future-scope-section bg-surface">
        <div className="future-scope-inner">
          <div className="future-text">
            <div className="section-pill"><TrendingUp size={14} /> Market Demand</div>
            <h2>The Future Scope of Tech</h2>
            <p>
              The tech landscape is evolving rapidly. Whether it's the rise of Generative AI or the expansion of Cloud Infrastructure, being prepared for the careers of tomorrow is more important than ever.
            </p>
            <ul className="future-list">
              <li><CheckCircle2 size={16} className="text-purple" /> 11.5M new tech jobs expected by 2026.</li>
              <li><CheckCircle2 size={16} className="text-purple" /> 40% growth in AI and Data Science sectors.</li>
              <li><CheckCircle2 size={16} className="text-purple" /> High shift towards remote, skills-first hiring.</li>
            </ul>
          </div>
          <div className="future-visual">
            <div className="visual-card">
              <BarChart size={32} className="text-purple" />
              <h3>High Growth Industries</h3>
              <div className="bar-row"><div className="bar-label">AI & ML</div><div className="bar-track"><div className="bar-fill" style={{width: '95%'}}></div></div></div>
              <div className="bar-row"><div className="bar-label">Cloud</div><div className="bar-track"><div className="bar-fill" style={{width: '85%'}}></div></div></div>
              <div className="bar-row"><div className="bar-label">Sec</div><div className="bar-track"><div className="bar-fill" style={{width: '80%'}}></div></div></div>
              <div className="bar-row"><div className="bar-label">Web3</div><div className="bar-track"><div className="bar-fill" style={{width: '60%'}}></div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Careers Section */}
      <section className="trending-section">
        <div className="trending-header">
          <div className="section-pill">🔥 Trending Insights</div>
          <h2>Explore Top Career Paths</h2>
          <p>Discover the most high-demand engineering paths mapped step-by-step.</p>
        </div>

        <div className="trending-grid">
          {trendingCareers.map(career => (
            <div className="trending-card" key={career.id}>
              <div className="card-top-accent" style={{ background: career.gradient }} />
              <div className="trending-card-body">
                <div className="trending-emoji">{career.emoji}</div>
                <h3 className="trending-title">{career.title}</h3>
                <p className="trending-desc">{career.tagline}</p>
                <div className="trending-stats">
                  <span className="stat-pill">💼 {career.demand}% Demand</span>
                  <span className="stat-pill">💰 {career.salary.min}-{career.salary.max} LPA</span>
                </div>
                <button className="btn-link" onClick={() => navigate(`/career/${career.id}`)}>
                  View Full Roadmap <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/roadmaps')}>Browse All Roadmaps</button>
        </div>
      </section>

      {/* How it works section */}
      <section className="how-it-works-section bg-surface">
        <div className="trending-header">
          <div className="section-pill"><Zap size={14} /> Process</div>
          <h2>From Zero to Job-Ready</h2>
          <p>We structure the chaos of learning into a clear actionable timeline.</p>
        </div>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-icon-wrap">
              <GraduationCap size={28} className="text-purple" />
            </div>
            <h3>1. Take the Assessment</h3>
            <p>Answer a few questions about your interests and current skill level.</p>
          </div>
          <div className="step-connector" />
          <div className="step-item">
            <div className="step-icon-wrap">
              <Sparkles size={28} className="text-purple" />
            </div>
            <h3>2. Get AI Matched</h3>
            <p>Our algorithm curates the best possible tech roles based on your profile.</p>
          </div>
          <div className="step-connector" />
          <div className="step-item">
            <div className="step-icon-wrap">
              <Briefcase size={28} className="text-purple" />
            </div>
            <h3>3. Follow Roadmap</h3>
            <p>Get a month-by-month plan with top resources and project milestones.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-section">
              <div className="logo-icon bg-purple"><Compass size={18} /></div>
              <span className="logo-text text-white">PathPilot AI</span>
            </div>
            <p className="footer-desc">Your intelligent career co-pilot. We stop the guessing game in tech education.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Roadmap Generator</a>
              <a style={{cursor: 'pointer'}} onClick={() => navigate('/compare')}>Compare Careers</a>
              <a href="#">Project Ideas</a>
              <a href="#">Student Dashboard</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Tech Careers List</a>
              <a href="#">Salary Guide</a>
              <a href="#">Top Platforms</a>
              <a href="#">Parents Guide</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PathPilot AI. Built for CS Students worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
