import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TopicSelection from './pages/TopicSelection';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import StudyPage from './pages/StudyPage';
import JobApply from './pages/JobApply';
import OfferLetter from './pages/JobOfferLetter';
import InterviewCallLetter from './pages/InterviewCallLetter';
import AuthService from './services/authService';

function PrivateRoute({ children }) {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function ThemedApp() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Header />
      <main>
        <Routes>
          <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <Admin />
            </PrivateRoute>
          } />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-question" element={<Admin />} />
          <Route path="/JobApply" element={<PrivateRoute><JobApply /></PrivateRoute>} />
          <Route path="/StudyPage" element={<PrivateRoute><StudyPage /></PrivateRoute>} />
          <Route path="/OfferLetter" element={<PrivateRoute><OfferLetter /></PrivateRoute>} />
          <Route path="/InterviewCallLetter" element={<PrivateRoute><InterviewCallLetter /></PrivateRoute>} />
          <Route path="/topics" element={<PrivateRoute><TopicSelection /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ThemedApp />
          <style>
            {`
              .App {
                transition: background-color 0.3s, color 0.3s;
                padding: 20px;
              }

              .light {
                background-color: #f0f0f0;
                color: #333;
              }

              .dark {
                background-color: #333;
                color: #f0f0f0;
              }

              @media (max-width: 768px) {
                .App {
                  padding: 10px;
                }
              }

              @media (min-width: 769px) and (max-width: 1024px) {
                .App {
                  padding: 15px;
                }
              }

              @media (min-width: 1025px) {
                .App {
                  padding: 20px;
                }
              }
            `}
          </style>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;