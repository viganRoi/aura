import React from "react";

const NewsCard = ({ image, date, title, content, navigateTo }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-2 md:p-4">
        <p className="text-xs md:text-sm text-gray-500">{date}</p>
        <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
        <p className="text-gray-600 text-sm mt-1 md:mt-2 line-clamp-2">
          {content}
        </p>
        <button
          onClick={navigateTo}
          className="mt-2 md:mt-4 flex items-center gap-1 hover:underline"
        >
          Lexo më shumë →
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
