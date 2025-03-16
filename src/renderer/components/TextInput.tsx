import clsx from "clsx";
import { FieldErrors } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  ref: React.Ref<HTMLInputElement>;
  errors?: FieldErrors;
};

export default function TextInput({
  label,
  name,
  placeholder,
  onBlur,
  onChange,
  ref,
  errors,
}: Props) {
  const errorMessage = errors?.[name]?.message as string;

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type="text"
        className={clsx("input", errorMessage && "input-error")}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        ref={ref}
      />

      <p className="text-error">{errorMessage}&nbsp;</p>
    </fieldset>
  );
}
