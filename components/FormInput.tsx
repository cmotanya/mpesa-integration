import { cn } from "@/utils/cn";
import { FormInputProps } from "@/utils/types";
import { Fade } from "react-awesome-reveal";
import { Controller } from "react-hook-form";

const FormInput = ({
  control,
  name,
  label,
  type,
  placeholder,
  autoFocus,
  Icon,
}: FormInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = !!fieldState.error;
      const isSuccess = !hasError && fieldState.isTouched && !!field.value;

      return (
        <div>
          <label
            htmlFor={name}
            className="text-text/80 block text-sm font-medium"
          >
            {label}
          </label>

          <div className="group relative">
            {Icon && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Icon
                  className={cn(
                    "group-focus-within:text-secondary text-secondary transition-all duration-200 ease-in-out group-focus-within:animate-pulse",
                    hasError && "text-error animate-pulse",
                    isSuccess && "text-success",
                  )}
                />
              </div>
            )}

            <input
              type={type}
              {...field}
              id={name}
              placeholder={placeholder}
              autoComplete={name}
              autoFocus={autoFocus}
              aria-invalid={!!fieldState.error}
              aria-describedby={`${name}-error`}
              className={cn(
                "ring-secondary/50 focus:ring-secondary shadow-accent/5 focus:shadow-text/15 block w-full rounded-lg py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:shadow-lg focus:outline-none",
                hasError && "ring-error",
                isSuccess && "ring-success",
              )}
            />
          </div>

          <Fade direction="up" duration={100} damping={0.5} triggerOnce>
            {fieldState.error && (
              <span
                id={`${name}-error`}
                className="text-error flex items-center gap-1 text-sm font-medium"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {fieldState.error.message}
              </span>
            )}
          </Fade>
        </div>
      );
    }}
  />
);

export default FormInput;
