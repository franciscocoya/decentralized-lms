"use client";

import React from "react";

const BaseHeading: React.FC<{ text: string }> = ({ text }) => {
  return <h1 className="text-[2rem] font-bold">{text}</h1>;
};

export default BaseHeading;
