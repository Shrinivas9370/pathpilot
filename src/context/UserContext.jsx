import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const DEFAULT_STATE = {
  role: null, // 'student' | 'parent'
  profile: {
    name: '',
    class: '',
    interests: [],
    skills: {},
    personality: [],
  },
  stepData: {
    1: null, // self discovery answers
    2: null, // skill assessment
    3: null, // seen career cards
    4: null, // matched careers
    5: null, // selected career
    6: null, // learning path preference
    7: null, // resource selections
    8: null, // project picks
    9: null, // final roadmap generated
  },
  currentStep: 1,
  completedSteps: [],
  matchedCareers: [],
  selectedCareer: null,
  savedCareers: [],
  isLoggedIn: false,
  username: '',
  email: '',
  enrolledCourses: [],
};

export function UserProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem('pathpilot_state');
      return stored ? JSON.parse(stored) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('pathpilot_state', JSON.stringify(state));
  }, [state]);

  const setRole = (role) => setState(s => ({ ...s, role }));

  const updateProfile = (updates) =>
    setState(s => ({ ...s, profile: { ...s.profile, ...updates } }));

  const saveStepData = (step, data) =>
    setState(s => ({
      ...s,
      stepData: { ...s.stepData, [step]: data },
      completedSteps: s.completedSteps.includes(step)
        ? s.completedSteps
        : [...s.completedSteps, step],
      currentStep: Math.max(s.currentStep, step + 1),
    }));

  const setMatchedCareers = (careers) =>
    setState(s => ({ ...s, matchedCareers: careers }));

  const setSelectedCareer = (career) =>
    setState(s => ({ ...s, selectedCareer: career }));

  const toggleSaveCareer = (career) =>
    setState(s => ({
      ...s,
      savedCareers: s.savedCareers.find(c => c.id === career.id)
        ? s.savedCareers.filter(c => c.id !== career.id)
        : [...s.savedCareers, career],
    }));

  const resetJourney = () => setState(DEFAULT_STATE);

  const login = (username, email) => {
    setState(s => ({ ...s, isLoggedIn: true, username, email, role: 'student' }));
  };

  const logout = () => {
    setState(s => ({ ...s, isLoggedIn: false, username: '', email: '', role: null, enrolledCourses: [] }));
  };

  const enrollCourse = (courseId) => {
    setState(s => {
      if (s.enrolledCourses.includes(courseId)) return s;
      return { ...s, enrolledCourses: [...s.enrolledCourses, courseId] };
    });
  };

  const unenrollCourse = (courseId) => {
    setState(s => ({
      ...s,
      enrolledCourses: s.enrolledCourses.filter(id => id !== courseId)
    }));
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setRole,
        updateProfile,
        saveStepData,
        setMatchedCareers,
        setSelectedCareer,
        toggleSaveCareer,
        resetJourney,
        login,
        logout,
        enrollCourse,
        unenrollCourse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
