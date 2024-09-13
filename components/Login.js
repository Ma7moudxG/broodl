"use client";
import React, { useState } from "react";
import { Fugaz_One, Open_Sans } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [authenticating, setAuthinticating] = useState(false)
  const {signup, login} = useAuth()
  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthinticating(true)
    try {
      if (isRegistered) {
        console.log("Signing up a new user");
        await signup(email, password)
      } else {
        console.log("Signing in existing user");
        await login(email, password)
      }
    } catch (error) {
      console.log(error.message);
    } finally {
        setAuthinticating(false)
    }
  }
  return (
    <form 
    onSubmit={handleSubmit}
    className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        {isRegistered ? "Register" : "Log In"}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border 
        border-solid border-indigo-400 rounded-full outline-none 
        hover:border-indigo-600 duration-200 focus:border-indigo-600"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border 
        border-solid border-indigo-400 rounded-full outline-none 
        hover:border-indigo-600 duration-200 focus:border-indigo-600"
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button clickHandler={handleSubmit} text={ authenticating ? 'Submitting' : "Submit"} full />
      </div>
      <p className="text-center">
        {isRegistered
          ? "Already have an account? "
          : `Don\'t have an account? `}
        <button
          onClick={() => setIsRegistered(!isRegistered)}
          className="text-indigo-600"
        >
          {isRegistered ? " Sign in" : " Sign up"}
        </button>
      </p>
    </form>
  );
}
