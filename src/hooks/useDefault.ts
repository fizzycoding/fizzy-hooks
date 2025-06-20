import { useMemo } from "react";

type ValidationFunction<T> = (value: T | null | undefined) => boolean;
const defaultValidation = <T>(value: T | null | undefined) => {
  console.log("VAlue: ", value);
  return value === null || value === undefined || value === "";
};
/**
 * useDefault
 *
 * Returns the given value if it's not null or undefined; otherwise returns the fallback default.
 *
 * @param value The current value
 * @param defaultValue The fallback if value is null or undefined
 * @param isInvalid - Optional validation function. Returns true if value should be replaced with default
 * @returns The effective value
 */

function useDefault<T>(
  value: T,
  defaultValue: T,
  isInvalid?: ValidationFunction<T>
): T {
  return useMemo(() => {
    const validator = isInvalid || defaultValidation;
    console.log(validator(value));

    return validator(value) ? defaultValue : value;
  }, [value, defaultValue, isInvalid]);
}

export default useDefault;
