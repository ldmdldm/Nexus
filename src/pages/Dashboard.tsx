import React from 'react';
import PortfolioStats from '../components/Dashboard/PortfolioStats';
import StakingControls from '../components/Dashboard/StakingControls';
import StakeSimulator from '../components/Dashboard/StakeSimulator';
import ProtocolList from '../components/Dashboard/ProtocolList';
import WalletConnect from '../components/WalletConnect';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-neo-green via-neo-soft to-neo-green bg-clip-text text-transparent">
          Secure the Future of Neo
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Join NEXUS Protocol to participate in Neo's restaking ecosystem and earn enhanced yields while securing the network.
        </p>
        <WalletConnect />
      </section>

      {/* Dashboard */}
      <section className="space-y-8">
        <PortfolioStats />
        <StakingControls />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StakeSimulator />
          <ProtocolList />
        </div>
      </section>
    </div>
  );
}