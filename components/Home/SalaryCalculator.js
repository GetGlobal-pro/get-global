"use client";
import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { ImManWoman } from "react-icons/im";
import { MdOutlineMan, MdFamilyRestroom } from "react-icons/md";
import CheckBox from "../Shared/CheckBox";
import Input from "../Shared/Input";
import Stats from "./Stats";
const SalaryCalculator = () => {
  const [isStats, setIsStats] = useState(false);
  const [inputs, setInputs] = useState({
    currentAddress: "",
    income: null,
    planAddress: "",
    status: "family",
    seniority: "mid",
  });
  const toggleStats = () => setIsStats(!isStats);
  const handleInputs = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleStatusChange = (status) => setInputs({ ...inputs, status });

  const handleSeniorityChange = (seniority) =>
    setInputs({ ...inputs, seniority });
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleStats();
  };
  return (
    <aside className="w-full h-full lg:row-span-2 bg-black-main rounded-[30px]">
      {!isStats && (
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-start lg:justify-between justify-start gap-[25.2px] sm:px-10 py-8 px-6 sm:py-[70px] lg:py-10"
        >
          <h2 className="text-2xl sm:tex-3xl text-white-main font-normal font-Just">
            Salary Insights
          </h2>
          <Input
            name="currentAddress"
            value={inputs.currentAddress}
            setState={handleInputs}
            label="Where do you live?"
          />
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <p className="text-white-main text-base sm:text-lg font-semibold">
              Your annual income?
            </p>
            <div className="w-full h-[45px] flex items-center justify-between rounded-[50px] bg-black-off">
              <input
                type="number"
                autoComplete="off"
                name="income"
                required
                value={inputs.income}
                onChange={handleInputs}
                className="w-full h-full border-none focus:outline-none bg-transparent px-4 text-white-main text-base sm:text-lg font-medium"
              />
              <span className="h-full flex items-center justify-center rounded-r-[30px] bg-black-main/20 px-6 text-white-main text-base sm:text-lg font-medium">
                INR
              </span>
            </div>
          </div>
          <Input
            name="planAddress"
            value={inputs.planAddress}
            setState={handleInputs}
            label="Where do you plan to move or considering moving to?"
          />

          <div className="w-full flex flex-col items-start justify-start gap-4">
            <p className="text-white-main text-base sm:text-lg font-semibold">
              Who will be accompanying you on this move?
            </p>
            <div className=" w-full flex items-center justify-start">
              <div
                onClick={() => handleStatusChange("single")}
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <MdOutlineMan
                  className={`${
                    inputs.status == "single"
                      ? "text-white-main"
                      : "text-black-faded"
                  } text-3xl group-hover:text-white-main group-hover:duration-200`}
                />
                <FaCircle
                  className={`${
                    inputs.status == "single"
                      ? "text-brand-main"
                      : "text-black-faded"
                  } text-xs group-hover:text-brand-main group-hover:duration-200`}
                />
                <span
                  className={`text-sm ${
                    inputs.status == "single"
                      ? "bg-brand-secondary text-black-main"
                      : "text-white-main bg-transparent"
                  } py-1 px-2 rounded-lg group-hover:text-black-main group-hover:bg-brand-secondary group-hover:duration-200`}
                >
                  Single
                </span>
              </div>
              <span className="w-full h-[1px] bg-white-main/40 -mx-5"></span>
              <div
                onClick={() => handleStatusChange("family")}
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <ImManWoman
                  className={`${
                    inputs.status == "family"
                      ? "text-white-main"
                      : "text-black-faded"
                  } text-2xl group-hover:text-white-main group-hover:duration-200`}
                />
                <FaCircle
                  className={`${
                    inputs.status == "family"
                      ? "text-brand-main"
                      : "text-black-faded"
                  } text-xs group-hover:text-brand-main group-hover:duration-200`}
                />
                <span
                  className={`text-sm ${
                    inputs.status == "family"
                      ? "bg-brand-secondary text-black-main"
                      : "text-white-main bg-transparent"
                  } py-1 px-2 rounded-lg group-hover:text-black-main group-hover:bg-brand-secondary group-hover:duration-200`}
                >
                  Family
                </span>
              </div>
              <span className="w-full h-[1px] bg-white-main/40 -ml-5 -mr-16"></span>
              <div
                onClick={() => handleStatusChange("family&kids")}
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <MdFamilyRestroom
                  className={`${
                    inputs.status == "family&kids"
                      ? "text-white-main"
                      : "text-black-faded"
                  } text-3xl group-hover:text-white-main group-hover:duration-200`}
                />
                <FaCircle
                  className={`${
                    inputs.status == "family&kids"
                      ? "text-brand-main"
                      : "text-black-faded"
                  } text-xs group-hover:text-brand-main group-hover:duration-200`}
                />
                <span
                  className={`text-sm whitespace-nowrap ${
                    inputs.status == "family&kids"
                      ? "bg-brand-secondary text-black-main"
                      : "text-white-main bg-transparent"
                  } py-1 px-2 rounded-lg group-hover:text-black-main group-hover:bg-brand-secondary group-hover:duration-200`}
                >
                  Family with kids
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <p className="text-white-main text-base sm:text-lg font-semibold">
              Job Seniority?
            </p>
            <div className="w-full grid grid-cols-2 sm:gap-5 gap-2">
              <CheckBox
                name="🌿 Mid level"
                setState={() => handleSeniorityChange("mid")}
                active={inputs.seniority == "mid"}
              />
              <CheckBox
                name="🍀 Senior"
                setState={() => handleSeniorityChange("senior")}
                active={inputs.seniority == "senior"}
              />
              <CheckBox
                name="🌲 Manager"
                setState={() => handleSeniorityChange("manager")}
                active={inputs.seniority == "manager"}
              />
              <CheckBox
                name="🌳 Leadership"
                setState={() => handleSeniorityChange("leader")}
                active={inputs.seniority == "leader"}
              />
            </div>
          </div>
          <button
            type="submit"
            className="h-[60px] w-[280px] flex items-center justify-center bg-white-main text-black-main text-lg sm:text-xl font-bold rounded-[50px]"
          >
            Get your Salary Insights
          </button>
        </form>
      )}
      {isStats && <Stats setState={toggleStats} />}
    </aside>
  );
};

export default SalaryCalculator;
