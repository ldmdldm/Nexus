import React, { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Gift, AlertCircle } from 'lucide-react';

export default function StakingControls() {
  const [showRestakeModal, setShowRestakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <StakingCard 
        onRestake={() => setShowRestakeModal(true)}
        onUnstake={() => setShowUnstakeModal(true)}
      />
      <RewardsCard />
      
      {showRestakeModal && (
        <RestakeModal onClose={() => setShowRestakeModal(false)} />
      )}
      
      {showUnstakeModal && (
        <UnstakeModal onClose={() => setShowUnstakeModal(false)} />
      )}
    </div>
  );
}

function StakingCard({ onRestake, onUnstake }: { onRestake: () => void; onUnstake: () => void }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      // Implement withdrawal logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Withdrawal successful!');
    } catch (error) {
      alert('Withdrawal failed. Please try again.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Staking Controls</h2>
      
      <div className="space-y-6">
        <div className="bg-neo-dark/60 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total Restaked</span>
            <span className="text-xl font-bold text-white">1,234.5678 NEO</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button 
              onClick={onRestake}
              className="flex items-center justify-center space-x-2 bg-neo-green/10 hover:bg-neo-green text-neo-green hover:text-neo-dark rounded-lg py-2 transition-all"
            >
              <ArrowUpCircle className="w-4 h-4" />
              <span>Restake</span>
            </button>
            <button 
              onClick={onUnstake}
              className="flex items-center justify-center space-x-2 bg-neo-green/10 hover:bg-neo-green text-neo-green hover:text-neo-dark rounded-lg py-2 transition-all"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Unstake</span>
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleWithdraw}
          disabled={isWithdrawing}
          className="w-full py-2 bg-neo-dark/60 hover:bg-neo-dark/40 text-gray-400 hover:text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWithdrawing ? 'Processing...' : 'Withdraw'}
        </button>
      </div>
    </div>
  );
}

function RewardsCard() {
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    try {
      // Implement claim logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Rewards claimed successfully!');
    } catch (error) {
      alert('Failed to claim rewards. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-neo-dark/40 backdrop-blur-lg rounded-xl border border-neo-green/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Claimable Rewards</h2>
      
      <div className="space-y-4">
        <div className="bg-neo-dark/60 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Total Claimable</span>
            <span className="text-xl font-bold text-white">45.6789 NEO</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">AVS rewards</span>
              <span className="text-white">32.4567 NEO</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">EIGEN rewards</span>
              <span className="text-white">13.2222 NEO</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleClaim}
          disabled={isClaiming}
          className="w-full py-3 bg-neo-green text-neo-dark rounded-lg font-semibold hover:glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Gift className="w-4 h-4" />
          <span>{isClaiming ? 'Claiming...' : 'Claim All Rewards'}</span>
        </button>
      </div>
    </div>
  );
}

function RestakeModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [protocol, setProtocol] = useState('');

  const handleRestake = async () => {
    try {
      // Implement restaking logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Restaking successful!');
      onClose();
    } catch (error) {
      alert('Restaking failed. Please try again.');
    }
  };

  return (
    <Modal onClose={onClose} title="Restake NEO">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 block mb-2">Amount to Restake</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-neo-dark/60 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-neo-green"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-2">Select Protocol</label>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="w-full bg-neo-dark/60 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-neo-green"
          >
            <option value="">Select a protocol</option>
            <option value="core">Neo Core Staking</option>
            <option value="liquid">Liquid Staking Pool</option>
            <option value="elite">Validator Elite Pool</option>
          </select>
        </div>

        <button
          onClick={handleRestake}
          disabled={!amount || !protocol}
          className="w-full py-3 bg-neo-green text-neo-dark rounded-lg font-semibold hover:glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Restake
        </button>
      </div>
    </Modal>
  );
}

function UnstakeModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState('');

  const handleUnstake = async () => {
    try {
      // Implement unstaking logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Unstaking successful!');
      onClose();
    } catch (error) {
      alert('Unstaking failed. Please try again.');
    }
  };

  return (
    <Modal onClose={onClose} title="Unstake NEO">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 block mb-2">Amount to Unstake</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-neo-dark/60 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-neo-green"
            placeholder="Enter amount"
          />
        </div>

        <div className="bg-neo-green/10 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-neo-green mt-0.5" />
            <div className="text-sm text-gray-400">
              <p className="mb-1">Unstaking will:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Start a 7-day cooling period</li>
                <li>Stop reward accrual</li>
                <li>Require gas fees</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={handleUnstake}
          disabled={!amount}
          className="w-full py-3 bg-neo-green text-neo-dark rounded-lg font-semibold hover:glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Unstake
        </button>
      </div>
    </Modal>
  );
}

function Modal({ 
  children, 
  onClose, 
  title 
}: { 
  children: React.ReactNode; 
  onClose: () => void; 
  title: string;
}) {
  return (
    <div className="fixed inset-0 bg-neo-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neo-dark/90 rounded-2xl border border-neo-green/20 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}