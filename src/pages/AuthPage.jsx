import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Compass, ArrowRight } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      login(username, email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      {/* Background elements */}
      <div className="auth-bg-blob auth-blob-1"></div>
      <div className="auth-bg-blob auth-blob-2"></div>
      
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo bg-purple">
            <Compass size={24} className="text-white" />
          </div>
          <h2>Welcome to PathPilot</h2>
          <p>Get started with your intelligent career co-pilot.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Continue to Dashboard <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer">
          <p>By continuing, you agree to our Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}
