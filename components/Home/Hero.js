import Link from "next/link";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <aside className="w-full flex flex-col items-start justify-start gap-10">
      <Link href={"/"} className="relative h-[40px] w-[150px] mb-8">
        <Image
          className="object-contain"
          alt="Get Global"
          src={"/Assets/Logo.png"}
          fill
        />
      </Link>
      <h1 className=" text-black-main text-left sm:text-5xl text-4xl sm:leading-[55px] font-Just font-extrabold">
        Considering a Tech Career Abroad? Discover{" "}
        <span className="bg-gradient-to-r from-[#144DB1] to-[#BE6AE3] bg-clip-text text-transparent">
          Your Ideal Salary
        </span>{" "}
        with our calculator
      </h1>
      <p className="text-lg sm:text-xl text-black-off font-normal">
        Stop wondering what the right salary for your next international job is.
        We calculate an{" "}
        <span className="text-black-main font-semibold">
          accurate and realistic salary range
        </span>{" "}
        based on the same indicators and benchmarks used by companies to set
        salaries.
      </p>
    </aside>
  );
};

export default Hero;
