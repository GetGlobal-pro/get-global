import React from "react";

const Input = ({ name, value, label, setState }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <p className="text-white-main text-base sm:text-lg font-semibold">
        {label}
      </p>
      <input
        type="text"
        autoComplete="off"
        name={name}
        value={value}
        onChange={setState}
        required
        className="w-full h-[45px] border-none focus:outline-none bg-black-off rounded-[50px] px-4 text-white-main text-base sm:text-lg font-medium"
      />
    </div>
  );
};

export default Input;
