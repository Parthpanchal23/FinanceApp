"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-midium flex">
        Welcome Back {isLoaded ? "," : ""}
        {user?.firstName} 👋
      </h2>
      <p className="text-smlg:text-base text-[#89b6fd]">
        This is your Financial overview Report
      </p>
    </div>
  );
};

export default WelcomeMessage;
