import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Stake from './pages/Stake';
import Validators from './pages/Validators';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neo-blue text-white">
        <Header />
        
        <main className="pt-24 pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/validators" element={<Validators />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;