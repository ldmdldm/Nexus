import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export default function StakeCard() {
  return (
    <div className="w-full max-w-md bg-neo-dark/40 backdrop-blur-lg rounded-2xl border border-neo-green/10 p-6 neo-gradient">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-neo-green" />
          <h3 className="text-xl font-bold text-white">Stake NEO</h3>
        </div>
        <span className="text-neo-green">APR: 12.4%</span>
      </div>
      
      <div className="space-y-4">
        <div className="bg-neo-dark/60 rounded-xl p-4">
          <label className="text-sm text-gray-400 block mb-2">Amount to Stake</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className="w-full bg-transparent text-white text-lg focus:outline-none"
              placeholder="0.0"
            />
            <button className="text-neo-green text-sm">MAX</button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Available Balance</span>
          <span>123.45 NEO</span>
        </div>
        
        <button className="w-full py-3 bg-neo-green text-neo-dark rounded-xl font-semibold hover:glow transition-all flex items-center justify-center space-x-2">
          <span>Stake Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}