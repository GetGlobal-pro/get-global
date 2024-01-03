// pages/api/unsubscribe/index.js
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

    const existingData = data[0];
    if (existingData.email_status !== "unsubscribed") {
      const { error: updateError } = await supabase
        .from("job_seeker")
        .update({ email_status: "unsubscribed" })
        .eq("verification_token", token);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }
    }

    // Redirect to the unsubscribe success page with the token as a query parameter
    return res.redirect(307, `/unsubscribe-success?token=${token}`);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}