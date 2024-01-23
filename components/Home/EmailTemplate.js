import React from "react";

const EmailTemplate = ({ verificationToken }) => {
  const verificationUrl = `https://getglobal.jobs/api/verify?token=${verificationToken}`;
  const unsubscribeUrl = `https://getglobal.jobs/api/unsubscribe?token=${verificationToken}`;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div className={styles.logo}>
          <img
            src="https://gg-static.vercel.app/logo2.png"
            alt="Company Logo"
            width={60}
            height={60}
          />
        </div>

        <hr></hr>

        <p>
          <strong>Hey there,</strong>
        </p>
        <p>A warm welcome to our community!</p>
        <p>
          We believe that the Get Global Salary calculator has provided you with
          insights intended to assist you in navigating salary expectations for
          global tech jobs. However, this is just the beginning.
        </p>
        <p>
          <strong>Big News:</strong> We're working hard to bring you the Get
          Global Job Board. This exclusive platform will feature curated global
          tech jobs from companies committed to providing visa and relocation
          support. It's designed to make your international career move smoother
          and more accessible than ever.
        </p>
        <p>
          <strong>Why Now?</strong> With Europe undergoing a significant
          demographic shift, anticipating 50 million fewer working-age
          individuals by 2035, and Canada facing crucial sector gaps due to an
          aging workforce, now is the perfect time for tech professionals like
          you to make a meaningful impact.
        </p>
        <p>
          <strong>Be the First to Know:</strong> Verify your email ID to stay
          updated about our launch and grab these timely opportunities. Let's
          turn your global career dreams into reality.
        </p>
        <div style={styles.ctaButton}>
          <a href={verificationUrl} style={styles.ctalink}>
            Verify Your Email
          </a>
        </div>
        <p>
          With Get Global, your career knows no borders. Let's navigate this
          exciting journey together.
        </p>

        <hr></hr>

        <p>
          <small>
            Didn’t sign up or signed up by mistake? You can safely ignore this
            email or{" "}
            <a href={unsubscribeUrl} style={styles.link}>
              unsubscribe
            </a>
            .
          </small>
        </p>
      </div>
    </div>
  );
};

const styles = {
  hr: {
    height: "0.5px",
    border: "none",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#ffffff",
  },
  logo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  content: {
    fontSize: "14px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  ctaButton: {
    width: "200px",
    height: "fit-content",
    padding: "10px",
    margin: "0 auto",
    textAlign: "center",
    background:
      "linear-gradient(90deg, rgba(105, 93, 202, 1) 20%, rgba(185, 107, 227, 1) 80%)",
  },

  ctalink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default EmailTemplate;
