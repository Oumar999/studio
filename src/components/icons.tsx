import * as React from 'react';

export const ResQLogo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M17.5 4.5L7.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
    <span className="font-headline text-2xl font-bold text-foreground">ResQ</span>
  </div>
);

export const MoroccanPattern = ({ className }: { className?: string }) => (
    <svg className={className} width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <pattern id='a' patternUnits='userSpaceOnUse' width='80' height='80' patternTransform='scale(1) rotate(0)'>
          <rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,0)'/>
          <path d='M40 0L40 80M0 40L80 40' stroke-width='1' stroke='hsl(var(--primary) / 0.1)' fill='none'/>
          <path d='M20 20L20 60L60 60L60 20z' stroke-width='1' stroke='hsl(var(--primary) / 0.1)' fill='none'/>
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill='url(#a)'/>
    </svg>
);
