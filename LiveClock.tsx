// src/components/LiveClock.tsx

import { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
      <span className="font-mono text-lg font-bold text-cyan-300 shadow-neon-cyan">
        {time.toLocaleTimeString()}
      </span>
    </div>
  );
};

export default LiveClock;