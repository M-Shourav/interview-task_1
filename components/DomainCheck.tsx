"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const DomainCheck = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleDomainCheck = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${formData.name}`
      );
      const data = response.data.data;
      if (data.taken) {
        toast.success(`${data?.message} no need to create store`);
        setFormData({ name: "" });
      } else {
        toast.error("Domain is available!");
      }
    } catch (error) {
      console.log("Domain checking error", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
      <div
        className="w-full max-w-md flex flex-col gap-3 border border-gray-300 rounded-md shadow-lg bg-white
      p-6"
      >
        <p className="text-lg font-semibold">Check Domain Availability</p>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Enter domain"
            required
            value={formData.name}
            onChange={handleDomainCheck}
            className="w-full h-10 outline-none border border-gray-400 rounded-md px-4
           placeholder:font-semibold focus-within:border-green-600"
          />
          <button
            type="submit"
            className="w-fit bg-blue-500 text-white p-2 rounded-md text-base font-semibold
        hover:bg-blue-600 duration-300 transition-colors"
          >
            Check Domain
          </button>
        </form>
        {isAvailable && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-medium text-red-600 tracking-wide">
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
