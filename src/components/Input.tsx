import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export default function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        {...rest}
        id={name}
        name={name}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
      />
    </div>
  );
}