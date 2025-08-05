import React, { useEffect, useState } from "react";

const AvailableFloor = ({ anchorEl, setPopupMenu, data, open }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (anchorEl && open) {
        const rect = anchorEl.getBoundingClientRect();
        const componentHeight = 50;
        const componentWidth = 200; // Assuming the width of the component is 200px
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
      
        const calculatedTop = rect.top + rect.height / 2 - componentHeight / 2;
        const calculatedLeft = rect.left + rect.width / 2 - componentWidth / 2;
      
        const isOverflowingVertically = calculatedTop + componentHeight > windowHeight;
        const isOverflowingHorizontally = calculatedLeft + componentWidth > windowWidth;
      
        const adjustedTop = isOverflowingVertically
          ? windowHeight - componentHeight
          : calculatedTop;
      
        const adjustedLeft = isOverflowingHorizontally
          ? windowWidth - componentWidth
          : calculatedLeft;
      
        setPosition({
          top: adjustedTop,
          left: adjustedLeft,
        });
      }
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
    };
  }, [anchorEl, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: position.top + 10 + "px",
        left: position.left + 50 + "px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        zIndex: 1,
      }}
    >
      <h1 className='certon text-white text-2xl'>Kati: {data.floorNumber}</h1>
    </div>
  );
};

export default AvailableFloor;
