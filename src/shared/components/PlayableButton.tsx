import { Button } from "@nextui-org/button";
import classNames from "classnames";
import { type FC } from "react";
import { BiPlay } from "react-icons/bi";

type Props = {
  readonly className?: string;
  readonly onClick?: () => void;
};

export const PlayableButton: FC<Props> = ({ className, onClick }) => {
  return (
    <Button
      as="div"
      isIconOnly
      color="primary"
      variant="shadow"
      onClick={onClick}
      className={classNames(
        "absolute z-50 opacity-0 right-5 transition-[0.2s ease]",
        "top-[110px] group-hover:opacity-100",
        className,
      )}
    >
      <BiPlay className="text-3xl" />
    </Button>
  );
};
