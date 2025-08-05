import React from "react";
import { Wishlist } from "../components";

const WishlistPage = () => {
  window.scrollTo({ top: 0 });
  return (
    <div className="w-full py-12 px-2 md:px-12">
      <h1 className="text-2xl text-center font-semibold montserrat text-brand">
        WISHLIST
      </h1>
      <Wishlist />
    </div>
  );
};

export default WishlistPage;
