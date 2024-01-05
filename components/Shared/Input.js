import React from "react";

const Select = ({ name, value, label, setState, options = [] }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <p className="text-white-main text-base sm:text-lg font-semibold">
        {label}
      </p>
      <select
        name={name}
        value={value}
        onChange={setState}
        required
        className="w-full h-[45px] border-r-8 border-transparent focus:outline-none bg-black-off rounded-[50px] px-4 text-white-main text-base sm:text-lg font-medium"
      >
        <option value="">Choose a Country ...</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
