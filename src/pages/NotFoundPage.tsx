import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search, Briefcase } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F3F3E7] flex items-center justify-center text-center px-4">
      <div className="max-w-lg bg-white p-8 sm:p-12 rounded-3xl border border-[#F5EBD0] shadow-xl space-y-5 text-[#590907]">
        <div className="text-7xl font-extrabold text-[#7F011F] font-heading">404</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-[#590907]/75 max-w-sm mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Explore our open career opportunities or return to the homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-2.5 bg-[#7F011F] hover:bg-[#590907] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/careers"
            className="px-6 py-2.5 bg-[#F5EBD0] hover:bg-[#F5EBD0]/80 text-[#590907] text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-[#7F011F]" />
            <span>Explore Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
