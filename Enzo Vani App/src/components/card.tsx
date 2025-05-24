import React from 'react';
import type { ReactNode } from 'react';


interface CardProps {
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="rounded-2xl shadow p-4 bg-white">
    {children}
  </div>
);