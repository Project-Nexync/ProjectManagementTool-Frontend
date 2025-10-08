import React from "react";

export default function FeatureCard({ title, imageSrc, description }) {
  return (
    <div className="bg-[rgba(51,51,51,0.3)] border border-[#505258] 
                    shadow-[2px_2px_6px_#23272f,-2px_-2px_6px_#3a3f4b] 
                    p-3 rounded-3xl flex flex-col gap-3 
                    w-full sm:w-80 md:w-72 lg:w-72 h-auto 
                    transition-shadow duration-300 hover:shadow-[4px_4px_12px_#23272f,-4px_-4px_12px_#3a3f4b]">

      {/* Image and Title */}
      <div className="flex flex-row items-center gap-3 sm:h-20 h-16">
        <img src={imageSrc} alt={title} className="w-16 sm:w-20 h-16 sm:h-20 object-contain" />
        <h3 className="text-white text-base sm:text-lg font-semibold whitespace-normal">{title}</h3>
      </div>

      {/* Description */}
      <p
        style={{ fontFamily: 'HelveticaThin, sans-serif', fontWeight: 400 }}
        className="text-gray-300 text-sm sm:text-base mt-0 px-1"
      >
        {description}
      </p>
    </div>
  );
}
