// pages/verification-success.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './verify.css';

export default function VerificationSuccess() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    // Cleanup function to clear the timeout and interval if the component unmounts before the redirection happens
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Email Verified!
        </h2>
        <p className="text-gray-600 text-center">
          Thank you for verifying your email. You're now ready to receive our
          newsletters and stay updated!
        </p>
        <p className="text-gray-600 text-center">
          Redirecting to home page in {seconds} seconds...
        </p>
      </div>
    </div>
  );
}