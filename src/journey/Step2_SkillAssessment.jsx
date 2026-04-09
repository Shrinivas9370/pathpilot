import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import './Steps.css';

const SKILL_AREAS = [
  { id: 'logic', label: 'Logical Thinking', icon: '🧩',
    question: 'If A > B and B > C, which is smallest?',
    options: ['A', 'B', 'C', 'Cannot determine'], answer: 'C' },
  { id: 'coding', label: 'Coding Basics', icon: '💻',
    question: 'What does a "loop" do in programming?',
    options: ['Stops the program', 'Repeats code multiple times', 'Creates a variable', 'Connects to internet'], answer: 'Repeats code multiple times' },
  { id: 'math', label: 'Mathematics', icon: '📐',
    question: 'What is 2^10 (2 to the power 10)?',
    options: ['512', '1024', '2048', '256'], answer: '1024' },
  { id: 'creativity', label: 'Creativity', icon: '🎨',
    question: 'You are building an app helping people find parking spots. What unique feature would you add?',
    options: ['Just show a map', 'Predict availability using real-time data', 'Show only paid spots', 'Show driving directions only'], answer: 'Predict availability using real-time data' },
  { id: 'data', label: 'Data Sense', icon: '📊',
    question: 'You have sales data for 12 months. Which chart is best to show the trend over time?',
    options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'], answer: 'Line chart' },
];

const SKILL_SLIDERS = [
  { id: 'python', label: 'Python / Programming', icon: '🐍' },
  { id: 'design', label: 'Design Sense', icon: '🎨' },
  { id: 'math', label: 'Math & Logic', icon: '📐' },
  { id: 'communication', label: 'Communication', icon: '🗣️' },
  { id: 'problem_solving', label: 'Problem Solving', icon: '🧩' },
];

const LEVEL_LABELS = ['Beginner', 'Basic', 'Intermediate', 'Strong', 'Expert'];

export default function Step2_SkillAssessment() {
  const navigate = useNavigate();
  const { saveStepData, updateProfile } = useUser();
  const [answers, setAnswers] = useState({});
  const [sliders, setSliders] = useState({ python: 30, design: 30, math: 30, communication: 30, problem_solving: 30 });
  const [submitted, setSubmitted] = useState(false);

  const quizScore = submitted
    ? SKILL_AREAS.filter(s => answers[s.id] === s.answer).length
    : 0;

  const overall = submitted
    ? Math.round((quizScore / SKILL_AREAS.length) * 50 + Object.values(sliders).reduce((a, b) => a + b, 0) / Object.values(sliders).length * 0.5)
    : 0;

  const skillLevel = overall >= 75 ? 'Strong' : overall >= 50 ? 'Intermediate' : 'Beginner';

  const handleSubmitQuiz = () => setSubmitted(true);

  const handleNext = () => {
    const skillData = { ...sliders, quizScore, overall, skillLevel };
    updateProfile({ skills: sliders });
    saveStepData(2, skillData);
    navigate('/journey/3');
  };

  return (
    <div className="step-page anim-fade-up">
      <div className="step-header">
        <div className="step-tag">Step 2 · Skill Assessment</div>
        <h1 className="step-title">How sharp are your <span className="gradient-text">skills?</span></h1>
        <p className="step-desc">Answer 5 quick questions and rate yourself on key areas. Honest answers = better career matches.</p>
      </div>

      {/* Quiz */}
      <div className="step-section">
        <h3 className="section-label">Quick Quiz <span className="text-muted text-xs">({SKILL_AREAS.length} questions)</span></h3>
        <div className="quiz-list">
          {SKILL_AREAS.map((skill, idx) => (
            <div key={skill.id} className={`quiz-card ${submitted && answers[skill.id] ? (answers[skill.id] === skill.answer ? 'correct' : 'wrong') : ''}`}>
              <div className="quiz-q-header">
                <span className="quiz-num">Q{idx + 1}</span>
                <span className="quiz-icon">{skill.icon}</span>
                <span className="quiz-area">{skill.label}</span>
              </div>
              <p className="quiz-question">{skill.question}</p>
              <div className="quiz-options">
                {skill.options.map(opt => (
                  <button
                    key={opt}
                    className={`quiz-option ${answers[skill.id] === opt ? 'selected' : ''} ${submitted && opt === skill.answer ? 'correct-ans' : ''} ${submitted && answers[skill.id] === opt && opt !== skill.answer ? 'wrong-ans' : ''}`}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [skill.id]: opt }))}
                    disabled={submitted}
                  >
                    {submitted && opt === skill.answer && <CheckCircle size={14} />}
                    {submitted && answers[skill.id] === opt && opt !== skill.answer && <XCircle size={14} />}
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button className="btn btn-outline" onClick={handleSubmitQuiz}>
            Submit Quiz ({Object.keys(answers).length}/{SKILL_AREAS.length} answered)
          </button>
        ) : (
          <div className="quiz-result">
            <div className="quiz-score">{quizScore}/{SKILL_AREAS.length}</div>
            <div className="quiz-score-label">Correct Answers</div>
          </div>
        )}
      </div>

      {/* Skill sliders */}
      <div className="step-section">
        <h3 className="section-label">Rate yourself honestly</h3>
        {SKILL_SLIDERS.map(s => (
          <div className="skill-bar" key={s.id}>
            <div className="skill-label">
              <span>{s.icon} {s.label}</span>
              <span className="badge badge-primary">{LEVEL_LABELS[Math.floor(sliders[s.id] / 25)]}</span>
            </div>
            <input type="range" min="0" max="100" step="5" value={sliders[s.id]}
              onChange={e => setSliders(sv => ({ ...sv, [s.id]: +e.target.value }))} />
          </div>
        ))}
      </div>

      {submitted && (
        <div className="skill-result-card">
          <div className="skill-level-display">
            <span className="skill-level-emoji">
              {skillLevel === 'Strong' ? '🔥' : skillLevel === 'Intermediate' ? '⚡' : '🌱'}
            </span>
            <div>
              <div className="skill-level-title">{skillLevel} Profile</div>
              <div className="skill-level-sub">Your overall skill score is {overall}/100</div>
            </div>
          </div>
        </div>
      )}

      <div className="step-footer">
        <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={!submitted}>
          Explore Career Options <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
