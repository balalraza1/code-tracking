import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue, saveSettings = true) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  }, [key]);

  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
  }, [value, key, saveSettings]);

  return [value, setValue];
};

export default useLocalStorage;
