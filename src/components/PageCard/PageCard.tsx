import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PageCard: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 w-full h-full max-h-[calc(100dvh-112px)] max-w-[calc(100%-24px)] p-4 bg-white rounded-lg shadow-card border-2 border-secondary overflow-y-auto mx-auto md:p-6 lg:max-w-2xl">
      {children}
    </div>
  );
};
