import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        //forme eke api call eka
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //response eke json widiyata denna ona nisa mehema dannee
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="p-3 border rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "signup"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>

      {error && <p className="mt-5 text-red-500">{error}</p>}
    </div>
  );
}
