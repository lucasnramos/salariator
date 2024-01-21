import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

function FormInput({ label, name, type = "text", required }: FormInputProps) {
  console.log('FormInput', required);
  return (
    <div className="block mb-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        <span className="text-red-700 ml-1 font-medium" hidden={!required}>
          *
        </span>
      </label>
      <input
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}

export default FormInput;
export type { FormInputProps };
