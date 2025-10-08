import { Crown, Dices, Gamepad2, House } from 'lucide-react';
import React from 'react';

import { Navlink } from './Navlink';

export const Navigation: React.FC = () => {
  return (
    <nav
      className="md:bg-gradient-to-b
      from-primary
      via-secondary
      md:to-accent/70 bg-primary md:bg-secondary text-white p-1 max-md:fixed max-md:bottom-0 max-md:inset-x-0 max-md:mx-auto max-md:z-50 max-md:rounded-t-md md:h-auto md:max-h-screen md:rounded-lg md:p-3 md:m-4 lg:p-4"
    >
      <ul className="flex max-md:justify-between max-md:w-full md:flex-col lg:gap-2.5">
        <li>
          <Navlink to="/" icon={<House />} label="Home" />
        </li>
        <li>
          <Navlink to="/game" icon={<Dices />} label="Game" />
        </li>
        <li>
          <Navlink to="/results" icon={<Gamepad2 />} label="Results" />
        </li>
        <li>
          <Navlink to="/hall-of-fame" icon={<Crown />} label="Hall of Fame" />
        </li>
      </ul>
    </nav>
  );
};
