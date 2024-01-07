// pages/api/verify/index.js
import { supabase } from "../../../components/Shared/client.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { token } = req.query;

    const { data, error } = await supabase
      .from("job_seeker")
      .select("email_status")
      .eq("verification_token", token);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Token not found." });
    }

    if (data.length > 1) {
      return res
        .status(500)
        .json({ error: "Multiple entries found for token." });
    }

    const existingData = data[0];
    if (existingData.email_status === "subscribed") {
      const { error: updateError } = await supabase
        .from("job_seeker")
        .update({ email_status: "verified" })
        .eq("verification_token", token);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }

      // Redirect to the verification success page after successful verification
      return res.redirect(307, "/verification-success");
    } else {
      return res
        .status(400)
        .json({ error: "Email already verified or token is invalid." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
