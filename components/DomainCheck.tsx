"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const DomainCheck = () => {
  const [domain, setDomain] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const checkDomain = async () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain name.");
      return;
    }
    try {
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${domain}`
      );
      const data = response.data.data;
      if (data?.taken) {
        setIsAvailable(false);
        toast.error(`${data?.message} no need to create store.`);
      } else {
        setIsAvailable(true);
        toast.success(`${data?.message}`);
      }
    } catch (error) {
      console.log("Checking domain error", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
      <div
        className="w-full max-w-md flex flex-col gap-3 border border-gray-300 rounded-md shadow-lg bg-white
      p-6"
      >
        <p className="text-lg font-semibold">Check Domain Availability</p>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter domain"
            name="name"
            required
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full h-10 outline-none border border-gray-400 rounded-md px-4
           placeholder:font-semibold focus-within:border-green-600"
          />
          <button
            onClick={checkDomain}
            className="w-fit bg-blue-500 text-white p-2 rounded-md text-base font-semibold
         hover:bg-blue-600 duration-300 transition-colors"
          >
            Check Domain
          </button>
        </div>
        {isAvailable && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-medium text-green-600 tracking-wide">
              Domain is available!
            </p>
            <Link
              className="text-base font-semibold text-blue-600 hover:underline 
              hover:underline-offset-2"
              href={"/store"}
            >
              Create Store
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainCheck;
