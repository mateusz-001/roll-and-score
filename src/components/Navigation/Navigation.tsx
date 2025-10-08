import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-primary text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Start
          </Link>
        </li>
        <li>
          <Link to="/game" className="hover:underline">
            Game
          </Link>
        </li>
        <li>
          <Link to="/results" className="hover:underline">
            Results
          </Link>
        </li>
        <li>
          <Link to="/hall-of-fame" className="hover:underline">
            Hall of Fame
          </Link>
        </li>
      </ul>
    </nav>
  );
};
