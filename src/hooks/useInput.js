import useLocalStorage from "./useLocalStorage";

const useInput = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = () => setValue(initialValue);

  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, attributeObj, reset];
}

export default useInput;