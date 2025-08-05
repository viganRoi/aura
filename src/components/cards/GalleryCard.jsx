import React from "react";

const GalleryCard = ({ image, title, mdHeight, onClick }) => {
  return (
    <div
      className={`w-full h-64 md:h-${mdHeight} relative overflow-hidden shadow-lg cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default GalleryCard;
