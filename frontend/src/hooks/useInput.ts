import { ChangeEvent, useRef, useState } from "react";

const useInput = <T>(initialValue: T) => {
  const [input, setInput] = useState<T>(initialValue);
  const handleInputChange = useRef((input: T) => {
    setInput(input);
  }).current;
  return [input, handleInputChange] as const;
};

export default useInput;
