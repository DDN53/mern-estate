import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">signup</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="p-3 border rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="Email"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-3 border rounded-lg"
          id="Password"
        />
      </form>
      <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80">
        signup
      </button>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
