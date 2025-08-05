import React, { useState, useEffect } from "react";
import { FilterGallery, Gallery, TitleSection } from "../components";
import { gallery } from "../utils/server";

const PortfolioPage = () => {
  window.scrollTo({ top: 0 });
  const [filteredGallery, setFilteredGallery] = useState(gallery);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      setFilteredGallery(gallery);
    } else {
      setFilteredGallery(
        gallery.filter((item) => item.category === filter)
      );
    }
  }, [filter]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="mb-12">
      <TitleSection
        title={"Galeria e Foleja"}
        image={"/assets/images/apartments/1.jpg"}
      />
      <FilterGallery onFilterChange={handleFilterChange} />
      <Gallery filteredGallery={filteredGallery} />
    </div>
  );
};

export default PortfolioPage;
