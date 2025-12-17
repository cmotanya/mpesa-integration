import { cn } from "@/utils/cn";
import { FormInputProps } from "@/utils/types";
import React from "react";
import { Controller } from "react-hook-form";

const FormInput = ({ control, name, label, type, Icon }: FormInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <div>
        <label htmlFor={name} className="text-text text-sm font-medium">
          {label}
        </label>
        <div className="group relative">
          <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
          </div>
          <input
            type={type}
            {...field}
            id={name}
            placeholder="Street Address"
            autoComplete="street-address"
            aria-invalid={!!fieldState.error}
            aria-describedby={`${name}-error`}
            className={cn(
              "ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none",
              fieldState.error && "ring-error",
            )}
          />
        </div>

        {fieldState.error && (
          <span id={`${name}-error`} className="text-error text-sm font-medium">
            {fieldState.error.message}
          </span>
        )}
      </div>
    )}
  />
);

export default FormInput;
