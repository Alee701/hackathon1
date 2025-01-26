import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CalculatorPage from './pages/CalculatorPage';
import LoginPage from './pages/LoginPage';
import LoanRequestForm from './pages/LoanRequestForm';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<LoanRequestForm />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
