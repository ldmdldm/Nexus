import React from 'react';
import { TrendingUp, Users, Lock } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      label: 'Total Value Locked',
      value: '$142.5M',
      change: '+12.3%',
      icon: Lock
    },
    {
      label: 'Active Validators',
      value: '1,234',
      change: '+5.7%',
      icon: Users
    },
    {
      label: 'Protocol Revenue',
      value: '$891.2K',
      change: '+8.9%',
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6 neo-gradient">
          <div className="flex items-center space-x-3 mb-4">
            <stat.icon className="w-6 h-6 text-neo-green" />
            <h3 className="text-gray-400">{stat.label}</h3>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="text-neo-green text-sm">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}