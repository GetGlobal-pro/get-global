"use client";
import React, { useState } from "react";
import * as Icons from "../../Svg/Icons";
import { GoChevronLeft } from "react-icons/go";
import WhatsAppPopup from "./WhatsAppPopup";

const Stats = ({ setState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-start lg:justify-between gap-4">
        <div className="w-full flex flex-col items-start justify-start gap-5 sm:py-[70px] lg:py-10 py-8 px-6 sm:px-10">
          <button
            onClick={setState}
            className="w-[100px] h-[30px] rounded-[40px] flex items-center justify-center gap-1 text-white-main text-sm font-Just font-normal bg-white-main/20"
          >
            <GoChevronLeft />
            Go back
          </button>
          <h2 className="text-white-main sm:text-3xl text-2xl font-extrabold font-Just">
            Your Salary Insights
          </h2>
          <p className="text-lg sm:text-[22px] sm:leading-8 font-medium text-white-main">
            Based on your living standards in India, the recommended salary in
            Germany, factoring in your family status and job seniority, ranges
            from
          </p>
          <span className="h-[68px] sm:w-[364px] w-full px-2 flex items-center justify-center bg-white-main/20 rounded-[40px] sm:text-3xl text-xl text-white-main font-bold">
            72,000 to 84,000 euros
          </span>
          <p className="text-lg sm:text-[22px] sm:leading-[28px] text-white-main font-medium">
            💵 Destination country{" "}
            <span className="text-[#FBD96A] font-bold">tax rates</span> are
            influenced by salary and family status, with a possible range from
            9% to 42%
          </p>
        </div>
        <div className="w-full sm:py-[70px] lg:py-6 py-8 sm:px-10 px-4 gradient rounded-b-[30px] flex flex-col items-start justify-start gap-8">
          <h2 className="text-white-main text-2xl sm:text-3xl font-medium font-Just">
            <span className="font-extrabold">20+ Professionals</span> have
            already transformed their Global tech careers
          </h2>
          <h2 className="text-[28px] sm:text-[35px] font-extrabold font-Just text-white-main">
            You're Next!
          </h2>
          <button
            onClick={toggleIsOpen}
            className="h-[60px] sm:w-[390px] w-full flex items-center justify-center gap-2 bg-white-main rounded-[40px] text-black-main text-base sm:text-xl font-bold"
          >
            <Icons.Whatsapp />
            Join Our Invite-only Whatsapp!
          </button>
        </div>
      </div>
      <WhatsAppPopup isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
    </>
  );
};

export default Stats;
