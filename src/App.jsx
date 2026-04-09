import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import CareerDetailPage from './pages/CareerDetailPage';
import ComparePage from './pages/ComparePage';
import RoadmapsPage from './pages/RoadmapsPage';
import AuthPage from './pages/AuthPage';
import JourneyLayout from './journey/JourneyLayout';
import Step1_SelfDiscovery from './journey/Step1_SelfDiscovery';
import Step2_SkillAssessment from './journey/Step2_SkillAssessment';
import Step3_CareerAwareness from './journey/Step3_CareerAwareness';
import Step4_CareerMatching from './journey/Step4_CareerMatching';
import Step5_DeepDive from './journey/Step5_DeepDive';
import Step6_LearningPath from './journey/Step6_LearningPath';
import Step7_Resources from './journey/Step7_Resources';
import Step8_Projects from './journey/Step8_Projects';
import Step9_FinalRoadmap from './journey/Step9_FinalRoadmap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<AuthPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/career/:id" element={<CareerDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/roadmaps" element={<RoadmapsPage />} />

        {/* 9-Step Journey */}
        <Route path="/journey" element={<JourneyLayout />}>
          <Route index element={<Navigate to="/journey/1" replace />} />
          <Route path="1" element={<Step1_SelfDiscovery />} />
          <Route path="2" element={<Step2_SkillAssessment />} />
          <Route path="3" element={<Step3_CareerAwareness />} />
          <Route path="4" element={<Step4_CareerMatching />} />
          <Route path="5" element={<Step5_DeepDive />} />
          <Route path="6" element={<Step6_LearningPath />} />
          <Route path="7" element={<Step7_Resources />} />
          <Route path="8" element={<Step8_Projects />} />
          <Route path="9" element={<Step9_FinalRoadmap />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
