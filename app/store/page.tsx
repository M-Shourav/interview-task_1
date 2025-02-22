"use client";
import { useState } from "react";
import axios from "axios";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    country: "Bangladesh",
    category: "Fashion",
    currency: "BDT",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://interview-task-green.vercel.app/task/stores/create",
        formData
      );
      setMessage("Store created successfully!");
    } catch (error) {
      setMessage("Error creating store.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a store</h2>
      <p className="text-gray-500 mb-6">
        Add your basic store information and complete the setup
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">
            Give your online store a name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter store name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            Your online store subdomain
          </label>
          <div className="flex items-center border p-2 rounded-md">
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="flex-grow outline-none"
              placeholder="Enter domain name"
              required
            />
            <span className="ml-2 text-gray-500">.expressitbd.com</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">
            Where's your store located?
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="Bangladesh">Bangladesh</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">What's your category?</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Choose store currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="BDT">BDT (Taka)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Store contact email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="you@example.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
        >
          Create store
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default CreateStore;
