import React from "react";

const CheckBox = ({ name, active, setState }) => {
  return (
    <div
      onClick={() => setState()}
      className={`h-[40px] xl:w-[212px] w-full flex items-center justify-start sm:gap-3 gap-1 group px-3 rounded-[10px] border border-gray ${
        active ? "bg-brand-secondary" : "bg-transparent"
      } hover:bg-brand-secondary cursor-pointer hover:duration-200`}
    >
      <span
        className={`h-[15px] w-[15px] border rounded-full ${
          active ? "bg-brand-main" : "bg-transparent"
        }  border-black-off group-hover:bg-brand-main group-hover:duration-200`}
      ></span>
      <p
        className={`sm:text-[15px] text-sm ${
          active ? "text-black-main" : "text-white-main"
        } font-normal group-hover:text-black-main group-hover:duration-200`}
      >
        {name}
      </p>
    </div>
  );
};

export default CheckBox;
