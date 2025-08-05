import React, { useEffect, useState } from "react";
import { GalleryCard, ImageModal } from "../";

const Gallery = ({ filteredGallery }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Define selectedImage
  const allImages = filteredGallery.map((el) => el.image); // Extract all images from filteredGallery

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center py-6 md:py-12 ">
      <div className="w-11/12 md:w-5/6  text-black text-start flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {filteredGallery.map((el) => (
            <GalleryCard
              key={el.id}
              image={el.image}
              title={el.title}
              mdHeight={"[400px]"}
              onClick={() => openModal(el.image)}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ImageModal
          images={allImages} // Pass all images to the modal
          selectedImage={selectedImage} // Pass the selected image
          closeModal={closeModal} // Pass the closeModal function
        />
      )}
    </div>
  );
};

export default Gallery;
