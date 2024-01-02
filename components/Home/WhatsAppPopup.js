"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import DialogueWrapper from "../Shared/DialogeWrapper";
import * as Icons from "../../Svg/Icons";

const WhatsAppPopup = ({ isOpen, toggleIsOpen }) => {
  const [email, setEmail] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const toggleThankYou = () => setThankYou(!thankYou);
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleThankYou();
  };
  return (
    <DialogueWrapper Open={isOpen} CloseEvent={toggleIsOpen}>
      {!thankYou && (
        <div className="w-full h-full sm:px-10 px-4 py-6 sm:py-7 flex flex-col items-start justify-start gap-6">
          <div className="w-full h-[304px] relative">
            <Image
              priority
              src={"/Assets/AlmostThere.png"}
              className="w-full h-full object-contain"
              alt=""
              fill
            />
          </div>
          <h2 className="text-black-main sm:text-5xl text-3xl font-extrabold font-Just">
            Almost there!
          </h2>
          <p className="text-base sm:text-lg font-normal text-black-off">
            Enter Your Email to{" "}
            <span className="text-black-main font-semibold">
              Get instant access
            </span>{" "}
            to Personalized International Job Alerts and Start Your Global
            Career Journey. 🌏✨
          </p>
          {/* fetures */}
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex items-center justify-start gap-2">
              <FaCircleCheck className="text-success text-2xl flex-shrink-0" />
              <p className="text-lg sm:text-xl text-black-off font-medium">
                <span className="text-black-main font-bold">
                  Exclusive Job Alerts:
                </span>{" "}
                Stay ahead with international tech jobs.
              </p>
            </div>
            <div className="w-full flex items-center justify-start gap-2">
              <FaCircleCheck className="text-success text-2xl flex-shrink-0" />
              <p className="text-lg sm:text-xl text-black-off font-medium">
                <span className="text-black-main font-bold">
                  Informed Decisions:
                </span>{" "}
                Gain insights to navigate your global career.
              </p>
            </div>
            <div className="w-full flex items-center justify-start gap-2">
              <FaCircleCheck className="text-success text-2xl flex-shrink-0" />
              <p className="text-lg sm:text-xl text-black-off font-medium">
                <span className="text-black-main font-bold">Insider Tips:</span>{" "}
                Receive guidance on visa process & relocation.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-start justify-start gap-5"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
              className="sm:h-[55px] h-[50px] w-full px-4 rounded-[30px] border-2 focus:outline-none text-black-main text-lg sm:text-xl font-medium border-black-main"
            />
            <button
              type="submit"
              className="h-[60px] w-full flex items-center justify-center gap-2 bg-green rounded-[30px] text-white-main text-lg sm:text-xl font-bold"
            >
              <Icons.Whatsapp /> Get your Whatsapp Invite
            </button>
          </form>
        </div>
      )}
      {thankYou && (
        <div className="w-full h-full sm:px-10 px-4 sm:py-7 py-6 flex flex-col items-start justify-start gap-6">
          <div className="w-full sm:h-[404px] h-[340px] relative">
            <Image
              priority
              src={"/Assets/ThankYou.png"}
              className="w-full h-full object-contain"
              alt=""
              fill
            />
          </div>
          <h2 className="text-black-main sm:text-5xl text-3xl font-extrabold font-Just">
            Thank you for joining Get Global!
          </h2>
          <p className="text-base sm:text-lg font-normal text-black-off">
            A link to our
            <span className="text-black-main font-semibold">
              exclusive invite-only WhatsApp channel.
            </span>{" "}
            Click to join and start exploring your global tech career
            opportunities today!
          </p>
          <button
            onClick={() => {
              toggleIsOpen();
              setTimeout(() => toggleThankYou(), 500);
            }}
            className="h-[60px] w-full flex flex-shrink-0 items-center justify-center gap-2 bg-green rounded-[30px] text-white-main text-lg sm:text-xl font-bold"
          >
            <Icons.Whatsapp /> Click here to Join
          </button>
        </div>
      )}
    </DialogueWrapper>
  );
};

export default WhatsAppPopup;
