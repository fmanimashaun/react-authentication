import { useState, useEffect } from 'react';

const getLocalValue = (key, initialValue) => {
  //SSR check
  if (typeof window === 'undefined') return initialValue;

  // if a value exists in local storage, get it
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return a result a function
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
