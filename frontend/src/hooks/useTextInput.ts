import { ChangeEvent, useState } from "react";

type TextInput = [
  string,
  (event: ChangeEvent<HTMLInputElement>) => void,
  () => void
];
const useTextInput = (): TextInput => {
  const [text, setText] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  const reset = () => setText("");

  return [text, onChange, reset];
};

export default useTextInput;
