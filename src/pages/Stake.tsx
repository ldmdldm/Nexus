import React, { useState } from 'react';
import { Shield, ArrowUpRight, Info } from 'lucide-react';

export default function Stake() {
  const [selectedPool, setSelectedPool] = useState('');
  
  const stakingPools = [
    {
      id: 'core',
      name: 'Core Staking',
      apy: '12.4%',
      minStake: '1,000 NEO',
      lockPeriod: '30 days',
      tvl: '$142.5M'
    },
    {
      id: 'liquid',
      name: 'Liquid Staking',
      apy: '15.2%',
      minStake: '100 NEO',
      lockPeriod: 'No lock',
      tvl: '$98.3M'
    },
    {
      id: 'validator',
      name: 'Validator Elite',
      apy: '18.7%',
      minStake: '5,000 NEO',
      lockPeriod: '90 days',
      tvl: '$56.1M'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Stake NEO</h1>
        <p className="text-gray-400">Choose a staking pool and start earning rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stakingPools.map((pool) => (
          <div
            key={pool.id}
            className={`bg-neo-dark/40 backdrop-blur-lg rounded-xl border p-6 cursor-pointer transition-all ${
              selectedPool === pool.id
                ? 'border-neo-green glow'
                : 'border-neo-green/10 hover:border-neo-green/30'
            }`}
            onClick={() => setSelectedPool(pool.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-neo-green" />
                <h3 className="font-semibold text-white">{pool.name}</h3>
              </div>
              <span className="text-neo-green">{pool.apy} APY</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Min Stake</span>
                <span className="text-white">{pool.minStake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lock Period</span>
                <span className="text-white">{pool.lockPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">TVL</span>
                <span className="text-white">{pool.tvl}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPool && (
        <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
          <h2 className="text-xl font-bold mb-6">Stake Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-400 flex items-center space-x-2">
                <span>Amount to Stake</span>
                <Info className="w-4 h-4 text-neo-green cursor-help" />
              </label>
              <input
                type="number"
                className="w-full bg-neo-dark/60 rounded-lg p-3 text-white mt-2 focus:outline-none focus:ring-1 focus:ring-neo-green"
                placeholder="Enter amount"
              />
            </div>

            <button className="w-full py-3 bg-neo-green text-neo-dark rounded-lg font-semibold hover:glow transition-all flex items-center justify-center space-x-2">
              <span>Stake Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}