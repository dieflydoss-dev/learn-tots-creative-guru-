import React from 'react';
import MascotIcon from './icons/MascotIcon';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center text-center">
        <div className="flex items-center">
          <MascotIcon className="h-10 w-10 mr-4 text-sky-500" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive'" }}>
            Learn Tots
          </h1>
        </div>
        {className && (
          <span className="mt-2 sm:mt-0 sm:ml-6 text-lg font-semibold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            Welcome, {className}!
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;