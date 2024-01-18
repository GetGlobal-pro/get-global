"use client";
import React, { useState } from "react";
import * as Icons from "../../Svg/Icons";
import { GoChevronLeft } from "react-icons/go";
import WhatsAppPopup from "./WhatsAppPopup";
import { usePlausible } from "next-plausible";


const Stats = ({
  setState,
  calculatedSalaryRange,
  currency,
  countryTo,
  countryFrom,
  homeCountryName,
  destinationCountryName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const plausible = usePlausible();
  // Function to round to nearest tens and format
  const formatSalary = (value) => {
    const rounded = Math.round(value / 10) * 10; // Round to nearest tens
    return rounded.toLocaleString(undefined, { maximumFractionDigits: 0 }); // Format with commas
  };

  const formattedLower = calculatedSalaryRange?.lower
    ? formatSalary(calculatedSalaryRange.lower)
    : "N/A";
  const formattedUpper = calculatedSalaryRange?.upper
    ? formatSalary(calculatedSalaryRange.upper)
    : "N/A";

  if (countryFrom && countryTo && countryFrom === countryTo) {
    return (
      <>
        <div className="w-full h-full flex flex-col items-start justify-start lg:justify-between gap-4">
          <div className="w-full flex flex-col items-start justify-start gap-5 sm:py-[70px] lg:py-10 py-8 px-6 sm:px-10">
            <button
              onClick={() => {
                setState();
                plausible("Go-back");
              }}
              className="w-[100px] h-[30px] rounded-[40px] flex items-center justify-center gap-1 text-white-main text-sm font-Just font-normal bg-white-main/20"
            >
              <GoChevronLeft />
              Go back
            </button>
            <h2 className="text-white-main sm:text-3xl text-2xl font-extrabold font-Just">
              Oops! It looks like you've selected the same country for both your current and desired location.
            </h2>
            <p className="text-lg sm:text-[18px] sm:leading-7 font-medium text-white-main">
              Our Salary Calculator is designed for international job changes. For salary insights within the same country or city,
              we recommend using Google for more specific information.
            </p>
          </div>
          <div className="w-full sm:py-[70px] lg:py-6 py-8 sm:px-10 px-4 gradient rounded-b-[30px] flex flex-col items-start justify-start gap-8">
            <h2 className="text-white-main text-2xl sm:text-3xl font-medium font-Just">
              <span className="font-bold text-3xl">
                Ready to explore job opportunities in {destinationCountryName} with Visa and relocation support?
              </span>
            </h2>
            <h2 className="text-[20px] sm:text-[20px] font-Just text-white-main">
              Join our exclusive WhatsApp Channel for daily job alerts and members-only meet-ups. Your next career adventure is just a click away!
            </h2>
            <button
              onClick={toggleIsOpen}
              className="h-[60px] sm:w-[390px] w-full flex items-center justify-center gap-2 bg-white-main rounded-[40px] text-black-main text-base sm:text-xl font-bold"
            >
              <Icons.Whatsapp />
              Join Get Global Community!
            </button>
          </div>
        </div>
        <WhatsAppPopup isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      </>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-start lg:justify-between gap-4">
        <div className="w-full flex flex-col items-start justify-start gap-5 sm:py-[70px] lg:py-10 py-8 px-6 sm:px-10">
          <button
            onClick={() => {
              setState();
              plausible("Go-back");
            }}
            className="w-[100px] h-[30px] rounded-[40px] flex items-center justify-center gap-1 text-white-main text-sm font-Just font-normal bg-white-main/20"
          >
            <GoChevronLeft />
            Go back
          </button>
          <h2 className="text-white-main sm:text-3xl text-2xl font-extrabold font-Just">
            Your Salary Insights
          </h2>
          <p className="text-lg sm:text-[18px] sm:leading-7 font-medium text-white-main">
            Based on your living standards in{" "}
            <span className="text-[#FBD96A] font-bold">
              {homeCountryName},{" "}
            </span>
            the recommended salary in{" "}
            <span className="text-[#FBD96A] font-bold">
              {destinationCountryName},{" "}
            </span>{" "}
            factoring in your family status and job seniority, ranges from
          </p>

          {/* {calculatedSalaryRange ? (
            <span className="h-[68px] sm:w-[364px] w-full px-2 flex items-center justify-center bg-white-main rounded-[40px] sm:text-2xl text-xl text-black font-bold">
              {lower ? Math.round(lower / 10) * 10 : "N/A"} -{" "}
              {upper ? Math.round(upper / 10) * 10 : "N/A"}{" "}
              {currency || "Currency not available"}
            </span>
          ) : (
            <span>Salary range not available</span>
          )} */}

          {calculatedSalaryRange ? (
            <span className="h-[68px] sm:w-[364px] w-full px-2 flex items-center justify-center bg-white-main rounded-[40px] sm:text-2xl text-xl text-black font-bold">
              {formattedLower} - {formattedUpper}{" "}
              {currency || "Currency not available"}
            </span>
          ) : (
            <span>Salary range not available</span>
          )}
          <p className="text-lg sm:text-[22px] sm:leading-[28px] text-white-main font-medium">
            💵 In{" "}
            <span className="text-[#FBD96A] font-bold">{destinationCountryName}</span>, tax rates are
            influenced by salary and family status, with a possible range from
            9% to 42%
          </p>
        </div>
        <div className="w-full sm:py-[70px] lg:py-6 py-8 sm:px-10 px-4 gradient rounded-b-[30px] flex flex-col items-start justify-start gap-8">
          <h2 className="text-white-main text-2xl sm:text-3xl font-medium font-Just">
            <span className="font-bold text-2xl">
              Ready to explore job opportunities in {destinationCountryName} with Visa and relocation support?
            </span>
          </h2>
          <h2 className="text-[20px] sm:text-[20px] font-Just text-white-main">
            Join our exclusive WhatsApp Channel for daily job alerts and members-only meet-ups. Your next career adventure is just a click away!
          </h2>
          <button
            onClick={toggleIsOpen}
            className="h-[60px] sm:w-[390px] w-full flex items-center justify-center gap-2 bg-white-main rounded-[40px] text-black-main text-base sm:text-xl font-bold"
          >
            <Icons.Whatsapp />
            Join Get Global Community!
          </button>
        </div>
      </div>
      <WhatsAppPopup isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
    </>
  );
};

export default Stats;
