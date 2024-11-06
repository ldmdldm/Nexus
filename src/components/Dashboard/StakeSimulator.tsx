import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

export default function StakeSimulator() {
  const [amount, setAmount] = useState('1000');
  const [duration, setDuration] = useState('30');

  const calculateReturns = () => {
    const principal = parseFloat(amount);
    const days = parseInt(duration);
    const apy = 0.124; // 12.4% APY
    return (principal * (1 + apy * days/365)).toFixed(2);
  };

  return (
    <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-neo-green" />
        <h2 className="text-xl font-bold text-white">Yield Calculator</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 flex items-center space-x-2">
              <span>Stake Amount</span>
              <Info className="w-4 h-4 text-neo-green cursor-help" />
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-neo-dark/60 rounded-lg p-3 text-white mt-2 focus:outline-none focus:ring-1 focus:ring-neo-green"
              placeholder="Enter amount"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Lock Period (Days)</label>
            <input
              type="range"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full h-2 bg-neo-dark rounded-lg appearance-none cursor-pointer mt-2"
              min="1"
              max="365"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>1 day</span>
              <span>{duration} days</span>
              <span>365 days</span>
            </div>
          </div>
        </div>
        
        <div className="bg-neo-dark/60 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Estimated Returns</span>
            <span className="text-neo-green">12.4% APY</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {calculateReturns()} NEO
          </div>
        </div>
      </div>
    </div>
  );
}