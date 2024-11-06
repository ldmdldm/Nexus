import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Users, TrendingUp, Clock } from 'lucide-react';

export default function ProtocolList() {
  const protocols = [
    {
      name: 'Neo Core Staking',
      apy: '12.4%',
      tvl: '$142.5M',
      risk: 'Low',
      icon: Shield,
      status: 'Active',
      validators: 234,
      minStake: '1,000 NEO',
      lockPeriod: '30 days',
      description: 'Secure the Neo network through our core staking protocol with competitive yields.',
      features: ['Automatic compounding', 'Weekly rewards', 'Instant unstaking available']
    },
    {
      name: 'Liquid Staking Pool',
      apy: '15.2%',
      tvl: '$98.3M',
      risk: 'Medium',
      icon: TrendingUp,
      status: 'Active',
      validators: 156,
      minStake: '100 NEO',
      lockPeriod: '14 days',
      description: 'Receive liquid staking tokens while earning staking rewards.',
      features: ['Tradeable stake tokens', 'No lock-up period', 'Dynamic reward boost']
    },
    {
      name: 'Validator Elite Pool',
      apy: '18.7%',
      tvl: '$56.1M',
      risk: 'High',
      icon: Users,
      status: 'Limited Space',
      validators: 45,
      minStake: '5,000 NEO',
      lockPeriod: '90 days',
      description: 'Premium validator pool with higher yields and advanced security features.',
      features: ['Enhanced APY', 'Priority support', 'Governance rights']
    }
  ];

  return (
    <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Available Protocols</h2>
      <div className="space-y-6">
        {protocols.map((protocol) => (
          <div 
            key={protocol.name}
            className="bg-neo-dark/60 rounded-lg p-6 hover:border-neo-green/20 border border-transparent transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <protocol.icon className="w-10 h-10 text-neo-green" />
                <div>
                  <h3 className="font-semibold text-white text-lg">{protocol.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-400">TVL: {protocol.tvl}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <RiskBadge risk={protocol.risk} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-neo-green">{protocol.apy}</span>
                <StatusBadge status={protocol.status} />
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{protocol.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-neo-dark/40 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span>Validators</span>
                </div>
                <span className="text-white font-semibold">{protocol.validators}</span>
              </div>
              <div className="bg-neo-dark/40 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                  <Shield className="w-4 h-4" />
                  <span>Min Stake</span>
                </div>
                <span className="text-white font-semibold">{protocol.minStake}</span>
              </div>
              <div className="bg-neo-dark/40 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Lock Period</span>
                </div>
                <span className="text-white font-semibold">{protocol.lockPeriod}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {protocol.features.map((feature, index) => (
                <span 
                  key={index}
                  className="text-xs bg-neo-green/10 text-neo-green px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            <button 
              onClick={() => {}} 
              className="w-full py-3 bg-neo-green/10 hover:bg-neo-green text-neo-green hover:text-neo-dark rounded-lg font-semibold transition-all"
            >
              Stake Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const colors = {
    Low: 'text-green-400',
    Medium: 'text-yellow-400',
    High: 'text-red-400'
  };
  
  return (
    <div className="flex items-center space-x-1">
      <AlertTriangle className={`w-3 h-3 ${colors[risk as keyof typeof colors]}`} />
      <span className={`text-sm ${colors[risk as keyof typeof colors]}`}>{risk} Risk</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-400';
      case 'Limited Space':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`flex items-center space-x-1 mt-1 justify-end ${getStatusColor(status)}`}>
      <CheckCircle className="w-3 h-3" />
      <span className="text-sm">{status}</span>
    </div>
  );
}