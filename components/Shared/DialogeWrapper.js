import React from "react";
import Dialog from "@mui/material/Dialog";
import { RxCross1 } from "react-icons/rx";

function DialogueWrapper({
  Open,
  CloseEvent,
  style,
  children,
  height = "h-[700px]",
}) {
  return (
    <Dialog
      open={Open}
      sx={{
        "& .MuiPaper-root": {
          background: "#fff",
          maxWidth: "unset",
          borderRadius: "30px",
          minWidth: "340px",
          minHeight: "700px",
        },
        "& ::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
      }}
    >
      <div
        className={`sm:w-[600px] md:w-[700px] w-[340px] ${style} relative rounded-[30px]`}
      >
        <div className={` ${height} overflow-auto`}>{children}</div>
      </div>
    </Dialog>
  );
}

export default DialogueWrapper;
