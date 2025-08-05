const VrModal = ({ onClose, src }) => {
  return (
    <div
      className="fixed w-full h-screen top-0 bg-brand bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div className="bg-brandD p-4 md:p-12 border border-gold rounded-lg w-full md:w-[50%] h-[80%] relative text-white">
        <iframe
          width="100%"
          height="100%"
          frameborder="10"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          src={src}
        ></iframe>
      </div>
    </div>
  );
};

export default VrModal;
