import { useEffect, useState } from 'react';

const CurrentTimeLine = () => {
  const calculateTopOffset = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  };

  const [topOffset, setTopOffset] = useState(calculateTopOffset());

  useEffect(() => {
    const interval = setInterval(() => {
      setTopOffset(calculateTopOffset());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="current-time-line" 
      style={{ top: `${topOffset}px` }} 
    />
  );
};

export default CurrentTimeLine;