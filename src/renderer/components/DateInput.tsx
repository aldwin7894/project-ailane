import clsx from "clsx";
import { DayPicker, TZDate } from "react-day-picker";
import { Control, Controller, RegisterOptions } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  control: Control<any, any>;
  rules: Omit<
    RegisterOptions<any, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
};

export default function DateInput({
  label,
  name,
  placeholder = "Pick a Date",
  control,
  rules,
}: Props) {
  const timeZone = "Asia/Manila";

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <fieldset className="fieldset">
          <legend className="fieldset-legend">{label}</legend>
          <button
            type="button"
            popoverTarget="rdp-popover"
            className={clsx("input", "input-border", error && "input-error")}
            style={{ anchorName: "--rdp" } as React.CSSProperties}
            onBlur={onBlur}
          >
            {value
              ? new TZDate(value, timeZone).toLocaleDateString()
              : placeholder}
          </button>
          <div
            popover="auto"
            id="rdp-popover"
            className="dropdown"
            style={{ positionAnchor: "--rdp" } as React.CSSProperties}
          >
            <DayPicker
              className="react-day-picker"
              mode="single"
              timeZone={timeZone}
              selected={value ? new TZDate(value, timeZone) : undefined}
              onSelect={onChange}
              footer={
                value
                  ? `Selected: ${new TZDate(value, timeZone).toLocaleDateString()}`
                  : "Nothing selected"
              }
            />
          </div>

          <p className="text-error">{error?.message}&nbsp;</p>
        </fieldset>
      )}
    />
  );
}
