import React, { useState } from 'react';
import { Shield, Users, Activity, ArrowUpRight, Search } from 'lucide-react';

export default function Validators() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const validators = [
    {
      name: 'Neo Foundation',
      address: 'neo1...',
      stake: '1.2M NEO',
      delegators: 1234,
      uptime: '99.99%',
      commission: '5%',
      status: 'Active'
    },
    {
      name: 'NeoEconoLabs',
      address: 'neo2...',
      stake: '800K NEO',
      delegators: 856,
      uptime: '99.95%',
      commission: '7%',
      status: 'Active'
    },
    {
      name: 'Neo Global',
      address: 'neo3...',
      stake: '650K NEO',
      delegators: 723,
      uptime: '99.90%',
      commission: '8%',
      status: 'Active'
    }
  ];

  const filteredValidators = validators.filter(
    v => v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Validators</h1>
          <p className="text-gray-400">View and select validators securing the network</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search validators"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-neo-dark/60 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-neo-green"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredValidators.map((validator, index) => (
          <div
            key={index}
            className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6 hover:border-neo-green/30 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-neo-green/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-neo-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{validator.name}</h3>
                  <p className="text-gray-400 text-sm">{validator.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Total Stake</div>
                  <div className="font-semibold">{validator.stake}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Delegators</div>
                  <div className="font-semibold">{validator.delegators}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Uptime</div>
                  <div className="font-semibold text-neo-green">{validator.uptime}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Commission</div>
                  <div className="font-semibold">{validator.commission}</div>
                </div>
              </div>

              <button className="w-full md:w-auto px-6 py-2 bg-neo-green/10 hover:bg-neo-green text-neo-green hover:text-neo-dark rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
                <span>Delegate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}