import React, { useState } from 'react';
import { Wallet, X } from 'lucide-react';

const WALLET_OPTIONS = [
  {
    name: 'NeoLine',
    description: 'NeoLine Browser Extension',
    type: 'extension'
  },
  {
    name: 'O3',
    description: 'O3 Wallet',
    type: 'mobile'
  },
  {
    name: 'OneGate',
    description: 'OneGate Wallet',
    type: 'mobile'
  }
];

export default function WalletConnect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (wallet: typeof WALLET_OPTIONS[0]) => {
    try {
      setConnecting(true);
      // Simulated connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Connected to ${wallet.name}`);
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Failed to connect to ${wallet.name}:`, error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-neo-green text-neo-dark rounded-lg font-semibold hover:glow transition-all flex items-center space-x-2"
      >
        <Wallet className="w-4 h-4" />
        <span>Connect Wallet</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neo-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neo-dark/90 rounded-2xl border border-neo-green/20 p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {WALLET_OPTIONS.map((wallet) => (
                <button
                  key={wallet.name}
                  className="w-full bg-neo-dark/60 hover:bg-neo-dark/40 border border-neo-green/10 hover:border-neo-green/30 rounded-xl p-4 flex items-center justify-between transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleConnect(wallet)}
                  disabled={connecting}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neo-green/10 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-neo-green" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white">{wallet.name}</h4>
                      <p className="text-sm text-gray-400">{wallet.description}</p>
                    </div>
                  </div>
                  {connecting && <span className="text-sm text-neo-green">Connecting...</span>}
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-400 text-center">
              New to Neo? Learn more about NEO wallets
            </p>
          </div>
        </div>
      )}
    </>
  );
}