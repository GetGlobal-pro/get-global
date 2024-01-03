import { useState } from "react";
import { supabase } from "../components/Shared/client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import './unsub.css';
import { useRouter } from 'next/router';

 
export default function UnsubscribeSuccess() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const handleResubscribe = async () => {
    // Find the user in the 'job_seeker' table
    const { data, error } = await supabase
      .from("job_seeker")
      .select()
      .eq("verification_token", token);

    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }

    // Check if the user exists
    if (data && data.length > 0) {
      const userId = data[0].id;

      // Update the 'email_status' to 'subscribed'
      const { error: updateError } = await supabase
        .from("job_seeker")
        .update({ email_status: "subscribed" })
        .eq("verification_token", token);

      if (updateError) {
        console.error("Error updating user:", updateError.message);
        return;
      }

      toast.success("You've been successfully resubscribed!"), {
        icon: "✅",
        style: {
          background: "#FFFFFF",
          color: "black",
          border: "2px solid #45a049",
          fontSize: "14px",
        },
        duration: 4000,
      };
    } else {
      toast.error("Token not found in our records."), {
        icon: "❌",
        style: {
          background: "#FFFFFF",
          color: "black",
          border: "2px solid #d32f2f",
          fontSize: "14px",
        },
        duration: 4000,
      };
    }
  };

  
  return (
    <div className="container">


      <div className="box">

        <Image src="/Assets/logo2.png" alt="Get Global Logo" width={150} height={150} />

        <h3>
          You've successfully been unsubscribed from <br />Get Global's Email
          Marketing Channel messages.
        </h3>
        <small>
          Didn't mean to unsubscribe?
        </small>
        <div className="input-container">

          <button className="btn" onClick={handleResubscribe}>
            Resubscribe
          </button>
        </div>

      </div>
      <Toaster position="top-right" />
    </div>
  );
}
