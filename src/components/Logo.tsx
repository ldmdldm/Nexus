import React from 'react';
import { Hexagon, Zap } from 'lucide-react';

export default function Logo() {
  return (
    <div className="relative flex items-center">
      <Hexagon className="w-8 h-8 text-neo-green absolute" />
      <Zap className="w-4 h-4 text-neo-dark absolute left-2 top-2" />
      <span className="text-2xl font-bold bg-gradient-to-r from-neo-green to-neo-soft bg-clip-text text-transparent ml-10">
        NEXUS
      </span>
    </div>
  );
}