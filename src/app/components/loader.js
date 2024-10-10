"use client";
import React from 'react';

const LoadingBar = () => {
  return (
    <div className="flex justify-center items-center">
      <svg 
        className="w-14 h-14 animate-spin" 
        viewBox="25 25 50 50"
      >
        <circle 
          className="stroke-foreground fill-none stroke-2 [stroke-linecap:round]" 
          r="20" 
          cy="50" 
          cx="50"
          style={{
            strokeDasharray: '1, 200',
            strokeDashoffset: 0,
            animation: 'dash 1.5s ease-in-out infinite',
          }}
        />
      </svg>

      <style jsx>{`
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dashoffset: -125px;
          }
        }
      `}</style>
    </div>
  );
};
export default LoadingBar;