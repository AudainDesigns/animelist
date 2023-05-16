import React, { createContext, useState, useEffect } from 'react';

export const ApiThrottleContext = createContext({
  throttleCount: 0,
  incrementThrottleCount: () => {},
  decrementThrottleCount: () => {},
});

export const ApiThrottleProvider = ({ children, throttleLimit }) => {
  const [throttleCount, setThrottleCount] = useState(0);

  const incrementThrottleCount = () => {
    setThrottleCount(prevCount => prevCount + 1);
  };

  const decrementThrottleCount = () => {
    setThrottleCount(prevCount => prevCount - 1);
  };

  useEffect(() => {
    //console.log('Throttle count:', throttleCount);
  }, [throttleCount]);

  return (
    <ApiThrottleContext.Provider
      value={{
        throttleCount,
        incrementThrottleCount,
        decrementThrottleCount,
      }}
    >
      {children}
    </ApiThrottleContext.Provider>
  );
};
