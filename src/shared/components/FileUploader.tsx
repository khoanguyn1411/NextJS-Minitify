import classnames from "classnames";
import { useRef, type ChangeEvent, type FC, type ReactNode } from "react";
import { BiFile, BiUpload, BiX } from "react-icons/bi";

type Props = {
  readonly value: File | null;
  readonly onChange: (value: File | null) => void;
  readonly errorMessage?: ReactNode;
  readonly label?: string;
};

export const FileUploader: FC<Props> = ({
  value,
  errorMessage,
  label,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Simulate click on file input
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[0]); // Access the selected file
    }
  };

  const handleClearFile = () => {
    onChange(null);
  };

  if (value != null) {
    return (
      <div className="flex flex-col gap-3 bg-input p-container rounded-md">
        <label className="text-sm">{label}</label>
        <div className="flex gap-2 items-center justify-between">
          <span className="flex text-sm gap-2 items-center">
            <BiFile /> {value.name}
          </span>
          <button onClick={handleClearFile} type="button">
            <BiX />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 bg-input p-container rounded-md">
      <label className="text-sm">{label}</label>
      <button
        type="button"
        onClick={handleButtonClick}
        className={classnames(
          "border-dashed border-1 items-center flex flex-col gap-2 p-4 w-full rounded-sm hover:bg-gray-800",
          {
            "border-red-500": errorMessage != null,
          },
        )}
      >
        <div className="flex flex-col gap-2 items-center">
          <BiUpload className="text-2xl" />
          <p className="text-sm">Click to upload file</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </button>
      <p className="text-xs text-red-500">{errorMessage}</p>
    </div>
  );
};
