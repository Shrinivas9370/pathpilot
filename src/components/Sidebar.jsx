import React from 'react';
import { Compass, GitMerge, LayoutDashboard, Settings, User } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar flex-col">
      <div className="sidebar-header flex items-center gap-2">
        <Compass size={28} className="brand-logo" />
        <h2>PathPilot</h2>
      </div>
      
      <nav className="sidebar-nav flex-col">
        <a href="#" className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <GitMerge size={20} />
          <span>Roadmaps</span>
        </a>
        <a href="#" className="nav-item">
          <User size={20} />
          <span>Profile</span>
        </a>
        <a href="#" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile flex items-center gap-2">
          <div className="avatar">U</div>
          <div className="user-info">
            <span className="name">User</span>
            <span className="role">Pro Member</span>
          </div>
        </div>
      </div>
    </div>
  );
}
