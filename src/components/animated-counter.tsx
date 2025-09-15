"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({ target, duration = 2000, className, decimals = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = target;
          if (start === end) return;

          const incrementTime = (duration / end) * (1 - Math.exp(-1)); // Adjust for easing
          let current = start;
          const timer = setInterval(() => {
            const step = (end - current) * 0.1; // Easing out effect
            current += step;
            if (Math.abs(end - current) < 0.01) {
              clearInterval(timer);
              current = end;
            }
            setCount(current);
          }, incrementTime);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
      })}
    </span>
  );
}
