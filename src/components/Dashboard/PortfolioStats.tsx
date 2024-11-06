import React from 'react';
import { LineChart, Wallet, Timer } from 'lucide-react';

export default function PortfolioStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Your Total Staked"
        value="1,234.56 NEO"
        change="+23.45%"
        icon={Wallet}
        chartData={[40, 70, 45, 90, 65, 85]}
      />
      <StatCard
        title="Estimated Rewards"
        value="45.67 NEO"
        change="+12.34%"
        icon={LineChart}
        chartData={[30, 60, 40, 70, 50, 80]}
      />
      <StatCard
        title="Lock Period"
        value="142 Days"
        subtext="Ends in 38 days"
        icon={Timer}
      />
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  change, 
  subtext, 
  icon: Icon,
  chartData 
}: {
  title: string;
  value: string;
  change?: string;
  subtext?: string;
  icon: React.ElementType;
  chartData?: number[];
}) {
  return (
    <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6 neo-gradient">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-neo-green" />
          <h3 className="text-gray-400">{title}</h3>
        </div>
        {change && (
          <span className="text-neo-green text-sm">{change}</span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-white block">{value}</span>
          {subtext && (
            <span className="text-sm text-gray-400">{subtext}</span>
          )}
        </div>
        {chartData && (
          <div className="flex items-end space-x-1 h-12">
            {chartData.map((value, i) => (
              <div
                key={i}
                style={{ height: `${value}%` }}
                className="w-1 bg-neo-green/50 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}