import clsx from "clsx";
import { FieldErrors } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  currencySymbol: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  ref: React.Ref<HTMLInputElement>;
  errors?: FieldErrors;
};

export default function CurrencyInput({
  label,
  name,
  placeholder,
  currencySymbol,
  onChange,
  onBlur,
  ref,
  errors,
}: Props) {
  const errorMessage = errors?.[name]?.message as string;

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <label className={clsx("input", errorMessage && "input-error")}>
        <span>{currencySymbol}</span>
        <input
          type="number"
          min="0.00"
          step="0.01"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          ref={ref}
        />
      </label>

      <p className="text-error">{errorMessage}&nbsp;</p>
    </fieldset>
  );
}
