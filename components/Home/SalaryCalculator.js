"use client";
import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { ImManWoman } from "react-icons/im";
import { MdOutlineMan, MdFamilyRestroom } from "react-icons/md";
import CheckBox from "../Shared/CheckBox";
import Select from "../Shared/Input";
import Stats from "./Stats";
import { supabase } from "../Shared/client";
import { usePlausible } from "next-plausible";

const SalaryCalculator = () => {
  const plausible = usePlausible();
  const [countryData, setCountryData] = useState({ home: {}, destination: {} });
  const [salaryData, setSalaryData] = useState({});
  const [pppData, setPppData] = useState({});
  const [homeCountries, setHomeCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [homeCurrency, setHomeCurrency] = useState("");
  const [destinationCurrency, setDestinationCurrency] = useState("");
  const [homeCountryName, setHomeCountryName] = useState("");
  const [destinationCountryName, setDestinationCountryName] = useState("");

  const [calculatedSalaryRange, setCalculatedSalaryRange] = useState(null);

  const [isStats, setIsStats] = useState(false);
  const [inputs, setInputs] = useState({
    currentAddress: "",
    income: "",
    planAddress: "",
    status: "family",
    seniority: "mid",
  });
  const toggleStats = () => setIsStats(!isStats);
  const handleInputs = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStatusChange = (status) => setInputs({ ...inputs, status });

  const handleSeniorityChange = (seniority) =>
    setInputs({ ...inputs, seniority });
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateSalary(); // This will update the calculatedSalaryRange state

    toggleStats();
  };

  const fetchHomeCountries = async () => {
    try {
      const { data: countries, error } = await supabase
        .from("country_ppp")
        .select("country_name, country_code");
      if (error) throw error;
      const formattedCountries = countries.map((country) => ({
        value: country.country_code,
        label: country.country_name,
      }));

      setHomeCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching home countries:", error);
    }
  };

  const fetchDestinationCountries = async () => {
    try {
      const { data: countries, error } = await supabase
        .from("country_stats")
        .select("Country_name, country_code");
      if (error) throw error;
      const formattedCountries = countries.map((country) => ({
        value: country.country_code,
        label: country.Country_name, // Adjust the field name as per your table structure
      }));

      setDestinationCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching destination countries:", error);
    }
  };

  useEffect(() => {
    fetchHomeCountries();
    fetchDestinationCountries();
  }, []);

  useEffect(() => {
    const selectedHomeCountry = homeCountries.find(
      (c) => c.value === inputs.countryFrom
    );
    if (selectedHomeCountry) {
      setHomeCountryName(selectedHomeCountry.label);
    }

    const selectedDestinationCountry = destinationCountries.find(
      (c) => c.value === inputs.countryTo
    );
    if (selectedDestinationCountry) {
      setDestinationCountryName(selectedDestinationCountry.label);
    }
  }, [
    inputs.countryFrom,
    inputs.countryTo,
    homeCountries,
    destinationCountries,
  ]);

  useEffect(() => {
    async function fetchData() {
      if (!inputs.countryFrom || !inputs.countryTo) {
        // If either country is not selected, skip fetching data
        return;
      }

      try {
        // Fetch PPP data for the home country
        const { data: homePppData, error: homePppError } = await supabase
          .from("country_ppp")
          .select("conversion_value_usd")
          .eq("country_code", inputs.countryFrom)
          .single();

        // Fetch PPP data for the destination country
        const { data: destPppData, error: destPppError } = await supabase
          .from("country_ppp")
          .select("conversion_value_usd")
          .eq("country_code", inputs.countryTo)
          .single();

        // Fetch Cost of Living and Rent Index data
        const { data: statsData, error: statsError } = await supabase
          .from("country_stats")
          .select("groceries_index, col_rent_index")
          .eq("country_code", inputs.countryTo)
          .single();

        // Fetch salary reference data based on seniority
        const { data: salaryData, error: salaryError } = await supabase
          .from("country_salary_tax")
          .select("25th_salary, median_salary, 75th_salary, 90th_salary")
          .eq("Country_code", inputs.countryTo)
          .single();

        if (homePppError || destPppError || statsError || salaryError) {
          // Handle errors (you can also set error states here to show error messages in the UI)
          console.error(
            homePppError || destPppError || statsError || salaryError
          );
          return;
        }

        // Update state with fetched data
        setPppData({ home: homePppData, destination: destPppData });
        setCountryData({ ...countryData, destination: statsData });
        setSalaryData(salaryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (inputs.countryFrom) {
      fetchData();
    }
  }, [inputs.countryFrom, inputs.countryTo]);

  // Fetch currency for countryFrom
  useEffect(() => {
    async function fetchHomeCurrency() {
      if (inputs.countryFrom) {
        try {
          const { data: currencyData, error } = await supabase
            .from("country_ppp")
            .select("currency")
            .eq("country_code", inputs.countryFrom)
            .single();

          if (error) {
            console.error("Error fetching home currency:", error);
            return;
          }

          if (currencyData && currencyData.currency) {
            setHomeCurrency(currencyData.currency);
          }
        } catch (error) {
          console.error("Error fetching home currency:", error);
        }
      }
    }
    fetchHomeCurrency();
  }, [inputs.countryFrom]);

  // Fetch currency for countryTo
  useEffect(() => {
    async function fetchDestinationCurrency() {
      if (inputs.countryTo) {
        try {
          const { data: currencyData, error } = await supabase
            .from("country_ppp")
            .select("currency")
            .eq("country_code", inputs.countryTo)
            .single();

          if (error) {
            console.error("Error fetching destination currency:", error);
            return;
          }

          if (currencyData && currencyData.currency) {
            setDestinationCurrency(currencyData.currency);
          }
        } catch (error) {
          console.error("Error fetching destination currency:", error);
        }
      }
    }
    fetchDestinationCurrency();
  }, [inputs.countryTo]);

  // ... existing useEffect for other data fetching that depends on both countryFrom and countryTo

  // This useEffect will log the currency state after it's updated
  useEffect(() => {}, [homeCurrency]);

  const calculateSalary = () => {
    // Check if all required data is available
    if (
      !pppData.home ||
      !pppData.destination ||
      !salaryData ||
      !countryData.destination
    ) {
      // Data not fully loaded or missing
      console.error("Required data is not available for salary calculation.");
      return;
    }

    // Convert Salary Using PPP
    const convertedSalary =
      inputs.income *
      (pppData.destination.conversion_value_usd /
        pppData.home.conversion_value_usd);

    // Adjust for Cost of Living and Rent
    const colRentIndex = countryData.destination.col_rent_index;

    const adjustedSalary = convertedSalary * (colRentIndex / 100);

    // Select Salary Reference Based on Job Seniority
    let referenceSalary;
    switch (inputs.seniority) {
      case "mid":
        referenceSalary = salaryData["25th_salary"];
        break;
      case "senior":
        referenceSalary = salaryData.median_salary;
        break;
      case "manager":
        referenceSalary =
          (salaryData.median_salary + salaryData["75th_salary"]) / 2;
        break;
      case "leader":
        referenceSalary =
          (salaryData["75th_salary"] + salaryData["90th_salary"]) / 2;
        break;
      default:
        console.error("Invalid seniority level");
        return;
    }

    // Include Grocery Expenses
    const groceryExpenses =
      referenceSalary * (countryData.destination.groceries_index / 100);

    // Total Required Salary (Pre-tax)
    let totalRequiredSalary = adjustedSalary + groceryExpenses;

    // Apply Family Status Markup
    if (inputs.status === "family&kids") {
      totalRequiredSalary *= 1.1; // 10% markup for family with kids
    } else if (inputs.status === "family") {
      totalRequiredSalary *= 1.05; // 5% markup for family
    }

    // Adjust for Salary Cap (if needed)

    // Determine Salary Range
    const salaryRangeLowerBound = totalRequiredSalary * 0.9;
    const salaryRangeUpperBound = totalRequiredSalary * 1.1;

    // Update state with the calculated salary range
    setCalculatedSalaryRange({
      lower: salaryRangeLowerBound,
      upper: salaryRangeUpperBound,
    });
  };

  useEffect(() => {}, [calculatedSalaryRange]);

  return (
    <aside className="w-full h-full lg:row-span-2 bg-black-main rounded-[30px]">
      {!isStats && (
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-start lg:justify-between justify-start gap-[25.2px] sm:px-10 py-8 px-6 sm:py-[70px] lg:py-10"
        >
          <h2 className="text-2xl sm:tex-3xl text-white-main font-normal font-Just">
            Salary Insights
          </h2>
          <Select
            name="countryFrom"
            value={inputs.countryFrom}
            setState={(e) => handleInputs(e)}
            // setState={handleInputs}
            options={homeCountries} // Ensure options is always an array
            label="Where do you live?"
          />

          <div className="w-full flex flex-col items-start justify-start gap-4">
            <p className="text-white-main text-base sm:text-lg font-semibold">
              Your annual income?
            </p>
            <div className="w-full h-[45px] flex items-center justify-between rounded-[50px] bg-black-off">
              <input
                type="number"
                autoComplete="off"
                name="income"
                required
                value={inputs.income}
                onChange={handleInputs}
                className="w-full h-full border-none focus:outline-none bg-transparent px-4 text-white-main text-base sm:text-lg font-medium"
              />
              <span className="h-full flex items-center justify-center rounded-r-[30px] bg-black-main/20 px-6 text-white-main text-base sm:text-lg font-medium">
                {homeCurrency}
              </span>
            </div>
          </div>
          <Select
            name="countryTo"
            value={inputs.countryTo}
            setState={handleInputs}
            options={destinationCountries}
            label="Where do you plan to move or considering moving to?"
          />

          <div className="w-full flex flex-col items-start justify-start gap-4">
            <p className="text-white-main text-base sm:text-lg font-semibold">
              Who will be accompanying you on this move?
            </p>
            <div className=" w-full flex items-center justify-start">
              <div
                onClick={() => handleStatusChange("single")}
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <MdOutlineMan
                  className={`${
                    inputs.status == "single"
                      ? "text-white-main"
                      : "text-black-faded"
                  } text-3xl group-hover:text-white-main group-hover:duration-200`}
                />
                <FaCircle
                  className={`${
                    inputs.status == "single"
                      ? "text-brand-main"
                      : "text-black-faded"
                  } text-xs group-hover:text-brand-main group-hover:duration-200`}
                />
                <span
                  className={`text-sm ${
                    inputs.status == "single"
                      ? "bg-brand-secondary text-black-main"
                      : "text-white-main bg-transparent"
                  } py-1 px-2 rounded-lg group-hover:text-black-main group-hover:bg-brand-secondary group-hover:duration-200`}
                >
                  Single
                </span>
              </div>
              <span className="w-full h-[1px] bg-white-main/40 -mx-5"></span>
              <div
                onClick={() => handleStatusChange("family")}
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <ImManWoman
                  className={`${
                    inputs.status == "family"
                      ? "text-white-main"
                      : "text-black-faded"
                  } text-2xl group-hover:text-white-main group-hover:duration-200`}
                />
                <FaCircle
                  className={`${
                    inputs.status == "family"
                      ? "text-brand-main"
                      : "text-black-faded"
                  } text-xs group-hover:text-brand-main group-hover:duration-200`}
                />
                <span
                  className={`text-sm ${
                    inputs.status == "family"
                      ? "bg-brand-secondary text-black-main"
                      : "text-white-main bg-transparent"
                  } py-1 px-2 rounded-lg group-hover:text-black-main group-hover:bg-brand-secondary group-hover:duration-200`}
                >
                  Family
                </span>
              </div>
              <span className="w-full h-[1px] bg-white-main/40 -ml-5 -mr-16"></span>
              <div
                onClick={() => handleStatusChange("family&kids")}
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <MdFamilyRestroom
                  className={`${
                    inputs.status == "family&kids"
                      ? "text-white-main"
                      : "text-black-faded"
                  } text-3xl group-hover:text-white-main group-hover:duration-200`}
                />
                <FaCircle
                  className={`${
                    inputs.status == "family&kids"
                      ? "text-brand-main"
                      : "text-black-faded"
                  } text-xs group-hover:text-brand-main group-hover:duration-200`}
                />
                <span
                  className={`text-sm whitespace-nowrap ${
                    inputs.status == "family&kids"
                      ? "bg-brand-secondary text-black-main"
                      : "text-white-main bg-transparent"
                  } py-1 px-2 rounded-lg group-hover:text-black-main group-hover:bg-brand-secondary group-hover:duration-200`}
                >
                  Family with kids
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <p className="text-white-main text-base sm:text-lg font-semibold">
              Job Seniority?
            </p>
            <div className="w-full grid grid-cols-2 sm:gap-5 gap-2">
              <CheckBox
                name="🌿 Mid level"
                setState={() => handleSeniorityChange("mid")}
                active={inputs.seniority == "mid"}
              />
              <CheckBox
                name="🍀 Senior"
                setState={() => handleSeniorityChange("senior")}
                active={inputs.seniority == "senior"}
              />
              <CheckBox
                name="🌲 Manager"
                setState={() => handleSeniorityChange("manager")}
                active={inputs.seniority == "manager"}
              />
              <CheckBox
                name="🌳 Leadership"
                setState={() => handleSeniorityChange("leader")}
                active={inputs.seniority == "leader"}
              />
            </div>
          </div>
          <button
            onClick={() => plausible("Salary-calc")}
            type="submit"
            className="h-[60px] w-[280px] flex items-center justify-center bg-white-main text-black-main text-lg sm:text-xl font-bold rounded-[50px]"
          >
            Get your Salary Insights
          </button>
        </form>
      )}
      {isStats && (
        <Stats
          setState={toggleStats}
          calculatedSalaryRange={calculatedSalaryRange}
          currency={destinationCurrency}
          countryFrom={inputs.countryFrom}
          countryTo={inputs.countryTo}
          homeCountryName={homeCountryName}
          destinationCountryName={destinationCountryName}
        />
      )}
    </aside>
  );
};

export default SalaryCalculator;
