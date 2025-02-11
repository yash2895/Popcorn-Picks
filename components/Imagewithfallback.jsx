import Image from "next/image";
import React from "react";
import { useState } from "react";
const Imagewithfallback = ({src,fallbacksrc}) => {
  const [imgSrc, set_imgSrc] = useState(src);
  return (
    <Image
      className="object-cover max-h-full max-w-full"
      fill
      priority=""
      src={imgSrc!="N/A"? imgSrc:fallbacksrc}
      alt="poster"
      sizes="(max-width: 200px)"
      onError={() => {
        set_imgSrc(fallbacksrc);
      }}
    />
  );
};

export default Imagewithfallback;
