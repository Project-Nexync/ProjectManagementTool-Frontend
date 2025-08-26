import React from "react";

export default function FeatureCard({ title, imageSrc, description }) {
  return (
    <div className="bg-[rgba(51,51,51,0.3)] border border-[#505258] shadow-[2px_2px_6px_#23272f,-2px_-2px_6px_#3a3f4b] p-4 rounded-4xl flex flex-col gap-4 w-[300px] h-[330px] transition-shadow duration-300 hover:shadow-[4px_4px_12px_#23272f,-4px_-4px_12px_#3a3f4b]">
      <div className="flex flex-row items-center gap-4 h-24">
        <img src={imageSrc} alt={title} className="w-24 h-24 object-contain" />
        <h3 className="text-white text-xl font-semibold whitespace-normal">{title}</h3>
      </div>
      <p className="text-[#C3C2C2] text-lg mt-2 font-HelveticaThin">{description}</p>
    </div>
  );
}