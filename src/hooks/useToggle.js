import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const toggle = (value) => setValue(prev => {
    if (typeof value === 'boolean') return value;
    return !prev;
  });


  return [value, toggle];
};

export default useToggle;