import React from "react";
import Dialog from "@mui/material/Dialog";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";

function CookiePopup({ Open, CloseEvent }) {
  return (
    <Dialog
      open={Open}
      sx={{
        "& .MuiPaper-root": {
          background: "#F2E6F7",
          maxWidth: "unset",
          borderRadius: "30px",
          minWidth: "330px",
        },
        "& ::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
      }}
    >
      <div className={`sm:w-[480px] w-[320px] relative rounded-[30px]`}>
        <div
          className={` sm:h-[280px] h-[240px] overflow-auto sm:py-8 sm:px-6 py-4 px-2`}
        >
          <div className="w-full h-full flex items-start justify-start gap-2 sm:gap-4">
            <div className="relative sm:h-[105px] h-[80px] w-[80px] sm:w-[105px] flex-shrink-0">
              <Image
                priority
                className="w-full h-full object-contain"
                src={"/Assets/Cookie.png"}
                alt="cookie"
                fill
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-4">
              <h2 className="text-black-main text-xl sm:text-3xl font-Just font-extrabold">
                {`Have a Cookie :)`}
              </h2>
              <p className="text-black-off text-base sm:text-xl font-normal">
                This website uses cookies to ensure you get the best experience
                on our website.
              </p>
              <button
                onClick={CloseEvent}
                className="px-[30px] py-4 bg-black-main text-white-main sm:text-xl text-base font-bold rounded-[40px]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CookiePopup;
