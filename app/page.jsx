"use client";

import HomePage from "../components/Home/Home";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Set the zoom level
    document.body.style.zoom = '90%';
  }, []);

  return (
    <main className="w-full h-full min-h-screen bg-white-main sm:bg-[url('/Assets/MainBg.png')] sm:bg-cover sm:bg-center sm:bg-no-repeat">
      <HomePage />
    </main>
  );
}
