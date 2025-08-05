import React, { useEffect, useState } from "react";

const FloorPopup = ({ anchorEl, data, open }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (anchorEl && open) {
        const rect = anchorEl.getBoundingClientRect();
        const componentHeight = 250;
        const windowHeight = window.innerHeight;

        const calculatedTop = rect.top;
        const calculatedLeft = rect.left - 100;

        const isOverflowing = calculatedTop + componentHeight > windowHeight;
        const adjustedTop = isOverflowing
          ? windowHeight - componentHeight
          : calculatedTop;

        setPosition({
          top: adjustedTop,
          left: calculatedLeft,
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
        top: position.top - 5 + "px",
        left: position.left + "px",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      
      <h1 className='certon text-white text-5xl'>{data.floorNumber}</h1>
      <p className=' text-white'>Kati</p>
    </div>
  );
};

export default FloorPopup;
