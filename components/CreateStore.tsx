"use client";
import React, { useState } from "react";
import Container from "./Container";
import Title from "./Title";
import { FaDesktop, FaGlobeAmericas } from "react-icons/fa";
import {
  MdCategory,
  MdCurrencyExchange,
  MdOutlineEditLocation,
  MdOutlineMail,
} from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    country: "",
    category: "",
    currency: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    domain: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = { name: "", domain: "", email: "" };
    let isValid = true;

    // Store name validation (Min 3 characters)
    if (formData.name.length < 3) {
      validationErrors.name = "Store name must be at least 3 characters long";
      isValid = false;
    }

    // Domain validation (Must be available)
    if (!formData.domain || formData.domain.length < 3) {
      validationErrors.domain = "Domain must be at least 3 characters long";
      isValid = false;
    }

    // Email validation (Basic regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format!";
      isValid = false;
    }

    // If validation fails, update state and prevent submission
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(
        "https://interview-task-green.vercel.app/task/stores/create",
        JSON.stringify(formData),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.data;
      if (data?.success) {
        toast.success("data added successfully");
        setFormData({
          name: "",
          domain: "",
          country: "",
          category: "",
          currency: "",
          email: "",
        });
        setErrors({ name: "", domain: "", email: "" });
      } else {
        toast.error("Network error");
      }
    } catch (error) {
      console.log("Data post error", error);
    }
  };

  return (
    <Container className="py-10 flex items-center justify-center">
      <div className="w-full max-w-screen-lg border border-gray-200 p-4 rounded-md shadow-md">
        <div className="flex flex-col items-start gap-y-5 border-b-2 border-b-gray-300">
          <Title>Create a Store</Title>
          <p
            className="text-[15px] md:text-lg font-medium md:font-medium text-gray-600
           tracking-wider mb-5"
          >
            Add your basic store information and complete the setup.
          </p>
        </div>
        <form
          onSubmit={handleSubmitForm}
          className="w-full flex flex-col gap-2 items-start"
        >
          {/*store name */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
            <div className="w-full flex items-start gap-x-3">
              <span className="hidden md:inline-block text-lg mt-2 text-blue-500">
                <FaDesktop />
              </span>
              <div className="flex flex-col items-start">
                <Title className="text-sm md:text-base">
                  Give your online store a name
                </Title>
                <p
                  className="hidden md:inline-block text-[15px] font-normal
                 text-gray-600 "
                >
                  A great store name is a big part of your success.Make sure it
                  aligns with your brand and products
                </p>
              </div>
            </div>
            <div className="w-full">
              <input
                type="text"
                name="name"
                placeholder="How'd you like call to your store?"
                required
                value={formData?.name}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 outline-none border-[2px] border-gray-300
                rounded-md placeholder:text-gray-400 placeholder:font-semibold focus-within:border-green-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          </div>
          {/* subdomain name */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
            <div className="w-full flex items-start gap-x-3">
              <span className="hidden md:inline-block text-lg mt-2 text-blue-500">
                <FaGlobeAmericas />
              </span>
              <div className="flex flex-col items-start">
                <Title className="text-sm md:text-base">
                  Your online store subdomain
                </Title>
                <p
                  className="hidden md:inline-block text-[15px] font-normal
                 text-gray-600 "
                >
                  A SEO-friendly store name is a crucial part of your
                  success.Make sure it aligns with your brand and products
                </p>
              </div>
            </div>
            <div className="w-full">
              <input
                type="text"
                name="domain"
                placeholder="@example.expressitbd.com"
                required
                value={formData?.domain}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 outline-none border-[2px] border-gray-300
                rounded-md placeholder:text-gray-400 placeholder:font-semibold focus-within:border-green-500"
              />
              {errors.domain && (
                <p className="text-red-500 text-sm">{errors.domain}</p>
              )}
            </div>
          </div>
          {/* location */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
            <div className="w-full flex items-start gap-x-3">
              <span className="hidden md:inline-block text-lg mt-2 text-blue-500">
                <MdOutlineEditLocation />
              </span>
              <div className="flex flex-col items-start">
                <Title className="text-sm md:text-base">
                  Where is your store located?
                </Title>
                <p
                  className="hidden md:inline-block text-[15px] font-normal
                 text-gray-600 "
                >
                  Set your store default location so we can optimize store
                  access and speed for yor customers.
                </p>
              </div>
            </div>
            <div className="w-full">
              <select
                name="country"
                required
                value={formData?.country}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 outline-none border-[2px] border-gray-300
                rounded-md placeholder:text-gray-400 placeholder:font-semibold focus-within:border-green-500"
              >
                <option value="">Select a country</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Usa">USA</option>
              </select>
            </div>
          </div>
          {/* category */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
            <div className="w-full flex items-start gap-x-3">
              <span className="hidden md:inline-block text-xl mt-2 text-blue-500">
                <MdCategory />
              </span>
              <div className="flex flex-col items-start">
                <Title className="text-sm md:text-base">
                  What is your category?
                </Title>
                <p
                  className="hidden md:inline-block text-[15px] font-normal
                 text-gray-600 "
                >
                  Set your store default category so that we can optimize store
                  access and speed for yor customers.
                </p>
              </div>
            </div>
            <div className="w-full">
              <select
                name="category"
                required
                value={formData?.category}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 outline-none border-[2px] border-gray-300
                rounded-md placeholder:text-gray-400 placeholder:font-semibold focus-within:border-green-500"
              >
                <option value="">Select a category</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Grocery">Grocery</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>
          {/* currency */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
            <div className="w-full flex items-start gap-x-3">
              <span className="hidden md:inline-block text-xl mt-2 text-blue-500">
                <MdCurrencyExchange />
              </span>
              <div className="flex flex-col items-start">
                <Title className="text-sm md:text-base">
                  Choose store currency
                </Title>
                <p
                  className="hidden md:inline-block text-[15px] font-normal
                 text-gray-600 "
                >
                  This is the main currency you wish to sell in.
                </p>
              </div>
            </div>
            <div className="w-full">
              <select
                name="currency"
                required
                value={formData?.currency}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 outline-none border-[2px] border-gray-300
                rounded-md placeholder:text-gray-400 placeholder:font-semibold focus-within:border-green-500"
              >
                <option value="">Select currency</option>
                <option value="BDT">BDT (TK)</option>
              </select>
            </div>
          </div>
          {/* email */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
            <div className="w-full flex items-start gap-x-3">
              <span className="hidden md:inline-block text-lg mt-2 text-blue-500">
                <MdOutlineMail />
              </span>
              <div className="flex flex-col items-start">
                <Title className="text-sm md:text-base">
                  Store contact email.
                </Title>
                <p
                  className="hidden md:inline-block text-[15px] font-normal
                 text-gray-600 "
                >
                  This is the email you will use to send notifications to an
                  receive orders from customer.
                </p>
              </div>
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData?.email}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 outline-none border-[2px] border-gray-300
                rounded-md placeholder:text-gray-400 placeholder:font-semibold focus-within:border-green-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-purple-500 px-6
           py-2 rounded-md text-white text-base font-semibold hover:bg-purple-700
           duration-300 ease-in-out transition-colors "
            >
              Create store
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateStore;
