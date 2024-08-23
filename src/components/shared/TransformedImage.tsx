"use client";

import { TransformedImageProps } from "@/types";
import Image from "next/image";
import React from "react";

const TransformedImage = ({
  image,
  type,
  title,
  isTransforming,
  setIsTransforming,
  transformationConfig,
  hasDownload = true,
}: TransformedImageProps) => {
  const downloadHandler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>
        {hasDownload && (
          <button className="download-btn" onClick={downloadHandler}>
            <Image
              className="pb-[6px]"
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransformedImage;
