import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full backdrop-blur-md bg-neo-dark/80 border-b border-neo-green/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/stake" active={location.pathname === '/stake'}>Stake</NavLink>
            <NavLink to="/validators" active={location.pathname === '/validators'}>Validators</NavLink>
            <NavLink to="/analytics" active={location.pathname === '/analytics'}>Analytics</NavLink>
          </nav>
          
          <button className="md:hidden text-neo-green">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link 
      to={to}
      className={`flex items-center space-x-1 transition-colors ${
        active ? 'text-neo-green' : 'text-gray-300 hover:text-neo-green'
      }`}
    >
      <span>{children}</span>
      <ArrowUpRight className="w-4 h-4" />
    </Link>
  );
}