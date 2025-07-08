import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  type?: HTMLInputTypeAttribute;
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
};

export default function InputField<T extends FieldValues>({
  control,
  type,
  name,
  label,
  placeholder,
  description,
}: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
          field.onChange(
            type === "number" ? Number(e.target.value) : e.target.value
          );
        };

        return (
          <FormItem className="w-full">
            <FormLabel htmlFor={name}>{label}</FormLabel>

            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                type={type}
                {...field}
                onChange={handleOnChange}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
