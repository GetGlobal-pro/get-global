"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import DialogueWrapper from "../Shared/DialogeWrapper";
import * as Icons from "../../Svg/Icons";
import { supabase } from "../Shared/client.js";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import cookie from 'js-cookie';


const WhatsAppPopup = ({ isOpen, toggleIsOpen }) => {
  const [email, setEmail] = useState("");
  const [refSource, setRefSource] = useState("Direct"); //to track user source
  const [thankYou, setThankYou] = useState(false);
  const toggleThankYou = () => setThankYou(!thankYou);
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    const cookieValue = cookie.get('email'); // Replace 'email' with the name of your cookie
    if (cookieValue) {
      setHasCookie(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setRefSource(searchParams.get("ref") || "Direct");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleThankYou();
  };

  const handleEmailSubmit = async () => {
    if (await isEmailDisposable(email)) {
      toast.error("Please enter a permanent email address.", {
        icon: "❌",
        style: {
          background: "#FFFFFF",
          color: "black",
          border: "2px solid #d32f2f",
          fontSize: "14px",
        },
        duration: 4000,
      });
      return;
    }

    if (isEmailValid(email)) {
      try {
        const token = await saveEmailToSupabase(email, refSource);
        toast.success("Email saved successfully", {
          icon: "🚀",
          style: {
            background: "#FFFFFF",
            color: "black",
            border: "2px solid #45a049",
            fontSize: "14px",
          },
          duration: 4000,
        });
        await sendEmail(email, token);
        setFormSubmitted(true);
      } catch (error) {
        if (error.message.includes("unique constraint")) {
          toast.error("You are already registered with GetGlobal.", {
            icon: "✅",
            style: {
              background: "#FFFFFF",
              color: "black",
              border: "2px solid #45a049",
              fontSize: "14px",
            },
            duration: 4000,
          });
        } else {
          toast.error("An error occurred while processing your request.", {
            icon: "❌",
            style: {
              background: "#FFFFFF",
              color: "black",
              border: "2px solid #d32f2f",
              fontSize: "14px",
            },
            duration: 4000,
          });
        }
      }
    } else {
      toast.error("Invalid email address.", {
        icon: "❌",
        style: {
          background: "#FFFFFF",
          color: "black",
          border: "2px solid #d32f2f",
          fontSize: "14px",
        },
        duration: 4000,
      });
    }
  };

  const saveEmailToSupabase = async (email, source) => {
    const token = uuidv4();
    console.log(token);
    const { data, error } = await supabase.from("job_seeker").insert([
      {
        js_email: email,
        email_status: "subscribed",
        Source: source,
        verification_token: token,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return token;
  };

  const sendEmail = async (email, token) => {
    const verificationUrl = `https://get-global-beta.vercel.app/api/verify?token=${token}`;
    try {
      const response = await fetch("/api/send/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationToken: token }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error);
      }
    } catch (error) {
      throw new Error(error.message || "Error sending email.");
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailDisposable = async (email) => {
    const domain = email.split('@')[1];

    const { data, error } = await supabase
      .from('disposable_emails')
      .select('domains')
      .eq('domains', domain);

    if (error) {
      console.error('Error checking disposable email:', error);
      return false;
    }

    return data.length > 0;
  };


  return (
    <DialogueWrapper Open={isOpen} CloseEvent={toggleIsOpen}>
      {thankYou || hasCookie ? (
        // If hasCookie is true, show the section with thankYou
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
              window.location.href = "https://ggbl.pro/lp";
            }}
            className="h-[60px] w-full flex flex-shrink-0 items-center justify-center gap-2 bg-green rounded-[30px] text-white-main text-lg sm:text-xl font-bold"
          >
            <Icons.Whatsapp /> Click here to Join
          </button>
        </div>
      ) : (
        // If hasCookie is false, show the section with !thankYou
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
            {/* ... (rest of the features section) */}
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
              onClick={() => {
                handleEmailSubmit();
                cookie.set('email', email);
                toggleThankYou();
              }}
            >
              <Icons.Whatsapp /> Get your Whatsapp Invite
            </button>
          </form>
        </div>
      )}
    </DialogueWrapper>
  );
}  

export default WhatsAppPopup;
