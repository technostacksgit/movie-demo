"use client";
import Image from 'next/image';
import React, { useState } from "react";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value: File | null;
  image?: string;
}

function ImageUpload({ onChange, value, image }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const renderContent = () => {
    if (value) {
      return (
        <Image
          src={URL.createObjectURL(value)}
          alt="Uploaded"
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      );
    }

    if (image) {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${image}`}
          alt="Existing"
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      );
    }

    return (
      <>
        <div className="mb-8 w-24 h-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
        <div className="font-normal text-sm">Drop an image here</div>
      </>
    );
  };

  return (
    <div
      className={`w-full h-[400px] lg:w-[473px] lg:h-[504px] bg-input border border-dashed rounded-lg hover:cursor-pointer overflow-hidden ${
        dragActive ? "border-primary" : ""
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="w-full h-full flex flex-col justify-center items-center text-primary-foreground"
      >
        {renderContent()}
      </label>
    </div>
  );
}

export default ImageUpload;
