import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    // <a href="/" className="font-bold text-2xl">
    //   <span>DeLearn</span>
    // </a>
    <Image src="/assets/images/logo_black_crop.png" alt="App logo" width={100} height={50} />
  );
};

export default Logo;
