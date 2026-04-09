import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAREERS } from '../data/careers';
import { ArrowLeft, ArrowRight, DollarSign, TrendingUp, BarChart2 } from 'lucide-react';
import './ComparePage.css';

const DEMAND_LABEL = (d) => d >= 90 ? 'Very High' : d >= 80 ? 'High' : 'Moderate';
const DIFF_LABEL = (d) => d >= 4 ? 'Hard' : d === 3 ? 'Medium' : 'Easy';
const DIFF_COLOR = (d) => d >= 4 ? '#f97316' : d === 3 ? '#eab308' : '#22c55e';
const DEMAND_COLOR = (d) => d >= 90 ? '#10b981' : d >= 80 ? '#3b82f6' : '#8b5cf6';

export default function ComparePage() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(9);

  const highestPaying = useMemo(() => {
    return [...CAREERS].sort((a, b) => b.salary.max - a.salary.max)[0];
  }, []);

  const highestDemand = useMemo(() => {
    return [...CAREERS].sort((a, b) => b.demand - a.demand)[0];
  }, []);

  const easiestToStart = useMemo(() => {
    return [...CAREERS].sort((a, b) => a.difficulty - b.difficulty)[0];
  }, []);

  return (
    <div className="compare-page-wrap anim-fade-in">
       {/* Top Nav */}
       <div className="compare-nav">
          <button className="btn btn-ghost" onClick={() => navigate('/student')}>
             <ArrowLeft size={18} /> Back to Dashboard
          </button>
       </div>

       <div className="compare-header stagger">
          <div className="compare-badge">CAREER COMPARISON</div>
          <h1 className="compare-title">Compare Career Paths</h1>
          <p className="compare-desc">
             Side-by-side comparison of tech careers — salary, difficulty, demand, and timeline at a glance.
          </p>
       </div>

       {/* Table Section */}
       <div className="compare-table-container stagger" style={{ animationDelay: '0.1s' }}>
          <table className="compare-table">
            <thead>
               <tr>
                 <th>Career Path</th>
                 <th>Avg Salary</th>
                 <th>Demand</th>
                 <th>Difficulty</th>
                 <th>Timeline</th>
               </tr>
            </thead>
            <tbody>
              {CAREERS.slice(0, visibleCount).map(c => (
                <tr key={c.id} onClick={() => navigate(`/career/${c.id}`)}>
                  <td className="cell-career">
                    <div className="career-indicator" style={{ backgroundColor: c.color }}></div>
                    <div className="career-info">
                       <span className="career-title">{c.title}</span>
                       <span className="career-tagline">{c.tagline}</span>
                    </div>
                  </td>
                  <td className="cell-salary">
                    <strong>{c.salary.min} - {c.salary.max} {c.salary.currency}</strong>
                  </td>
                  <td className="cell-demand">
                     <div className="progress-group">
                       <span className="progress-label">{DEMAND_LABEL(c.demand)}</span>
                       <div className="progress-bar-bg">
                         <div className="progress-bar-fill" style={{ width: `${c.demand}%`, backgroundColor: DEMAND_COLOR(c.demand) }}></div>
                       </div>
                     </div>
                  </td>
                  <td className="cell-difficulty">
                     <div className="progress-group">
                       <span className="progress-label">{DIFF_LABEL(c.difficulty)}</span>
                       <div className="progress-bar-bg">
                         <div className="progress-bar-fill" style={{ width: `${(c.difficulty/5)*100}%`, backgroundColor: DIFF_COLOR(c.difficulty) }}></div>
                       </div>
                     </div>
                  </td>
                  <td className="cell-timeline">
                     <div className="timeline-wrapper">
                         <span>{c.timeline}</span>
                         <ArrowRight className="row-arrow" size={18} />
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {visibleCount < CAREERS.length && (
             <div style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
               <button className="compare-select-btn" style={{ margin: '0 auto', color: '#6366f1', borderColor: '#c7d2fe', background: '#e0e7ff' }} onClick={() => setVisibleCount(prev => prev + 9)}>
                 View More Careers
               </button>
             </div>
          )}
       </div>

       {/* Summary Cards */}
       <div className="compare-summary-cards stagger" style={{ animationDelay: '0.2s' }}>
          <div className="summary-card highlight-purple">
             <div className="summary-icon"><DollarSign size={24} /></div>
             <div className="summary-content">
                <span className="summary-label">Highest Paying</span>
                <span className="summary-value">{highestPaying.title}</span>
                <span className="summary-sub">{highestPaying.salary.min}-{highestPaying.salary.max} {highestPaying.salary.currency}</span>
             </div>
          </div>
          <div className="summary-card highlight-emerald">
             <div className="summary-icon"><TrendingUp size={24} /></div>
             <div className="summary-content">
                <span className="summary-label">Highest Demand</span>
                <span className="summary-value">{highestDemand.title}</span>
                <span className="summary-sub">{DEMAND_LABEL(highestDemand.demand)} Demand</span>
             </div>
          </div>
          <div className="summary-card highlight-blue">
             <div className="summary-icon"><BarChart2 size={24} /></div>
             <div className="summary-content">
                <span className="summary-label">Easiest to Start</span>
                <span className="summary-value">{easiestToStart.title}</span>
                <span className="summary-sub">{easiestToStart.timeline}</span>
             </div>
          </div>
       </div>
    </div>
  );
}
