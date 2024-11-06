import React from 'react';
import { TrendingUp, Users, Lock, ArrowUp, ArrowDown } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    {
      label: 'Total Value Locked',
      value: '$142.5M',
      change: '+12.3%',
      trend: 'up',
      icon: Lock
    },
    {
      label: 'Active Validators',
      value: '1,234',
      change: '+5.7%',
      trend: 'up',
      icon: Users
    },
    {
      label: 'Protocol Revenue',
      value: '$891.2K',
      change: '+8.9%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const recentActivity = [
    {
      type: 'stake',
      address: 'neo1...',
      amount: '1,000 NEO',
      time: '5 mins ago'
    },
    {
      type: 'unstake',
      address: 'neo2...',
      amount: '500 NEO',
      time: '15 mins ago'
    },
    {
      type: 'stake',
      address: 'neo3...',
      amount: '2,500 NEO',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Protocol metrics and performance analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6 neo-gradient"
          >
            <div className="flex items-center space-x-3 mb-4">
              <metric.icon className="w-6 h-6 text-neo-green" />
              <h3 className="text-gray-400">{metric.label}</h3>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              <span className="text-neo-green text-sm">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-neo-dark/60 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'stake' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {activity.type === 'stake' ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {activity.type === 'stake' ? 'Stake' : 'Unstake'}
                    </div>
                    <div className="text-sm text-gray-400">{activity.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{activity.amount}</div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
          <h2 className="text-xl font-bold mb-6">Protocol Health</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Network Security Score</span>
                <span className="text-neo-green">98/100</span>
              </div>
              <div className="w-full bg-neo-dark/60 rounded-full h-2">
                <div className="bg-neo-green h-2 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Validator Participation</span>
                <span className="text-neo-green">95%</span>
              </div>
              <div className="w-full bg-neo-dark/60 rounded-full h-2">
                <div className="bg-neo-green h-2 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Stake Utilization</span>
                <span className="text-neo-green">87%</span>
              </div>
              <div className="w-full bg-neo-dark/60 rounded-full h-2">
                <div className="bg-neo-green h-2 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}