import { JSX } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import CurrencyInput from "../../CurrencyInput";
import DateInput from "../../DateInput";
import PhoneInput from "../../PhoneInput";
import TextInput from "../../TextInput";

export default function NewSale(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Sales>({
    mode: "all",
    defaultValues: {
      invoice_number: "",
      invoice_date: new Date().toISOString(),
      customer_name: "",
      customer_contact: "",
      cogs_amount: 0.0,
      total_amount: 0.0,
      discount_amount: 0.0,
      tax_amount: 0.0,
    },
    shouldFocusError: true,
  });

  const newSale = async (data: Sales) => {
    console.log("submit-success", data);
    await window.api.createSale(data);
    navigate("/sales");
  };
  const onError = (errors: FieldErrors) => console.log("submit-error", errors);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(newSale, onError)}
    >
      <h1 className="text-2xl font-bold">New Sale</h1>

      <div className="flex flex-col gap-1">
        <TextInput
          label="Invoice Number"
          placeholder="Invoice Number"
          {...register("invoice_number", {
            required: "Invoice Number is required",
          })}
          errors={errors}
        />
        <TextInput
          label="Customer Name"
          placeholder="Customer Name"
          {...register("customer_name")}
          errors={errors}
        />
        <PhoneInput
          label="Customer Contact"
          placeholder="Customer Contact"
          {...register("customer_contact", {
            pattern: {
              value: /^(\+63|0)\d{10}$/,
              message: "Invalid phone number",
            },
          })}
          errors={errors}
        />
        <DateInput
          label="Invoice Date"
          placeholder="Invoice Date"
          name="invoice_date"
          control={control}
          rules={{
            required: "Invoice Date is required",
          }}
        />
        <CurrencyInput
          label="Total Amount"
          currencySymbol="₱"
          {...register("total_amount", {
            required: "Total Amount is required",
            min: {
              message: "Total Amount cannot be 0",
              value: 0.01,
            },
          })}
          errors={errors}
        />
      </div>

      <div className="flex flex-row gap-2">
        <Link to="/sales" className="btn btn-outline">
          Cancel
        </Link>
        <input
          id="submit"
          type="submit"
          className="btn btn-primary"
          value="Submit"
        />
      </div>
    </form>
  );
}
