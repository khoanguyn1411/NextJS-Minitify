import { Input, type InputProps } from "@nextui-org/input";
import { useState, type FC } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

type Props = InputProps;

export const Password: FC<Props> = (props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordShown((prev) => !prev);
  };
  return (
    <Input
      type={isPasswordShown ? "text" : "password"}
      endContent={
        <button onClick={togglePasswordVisibility} type="button">
          {isPasswordShown ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
        </button>
      }
      {...props}
    />
  );
};
