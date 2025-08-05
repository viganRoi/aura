import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentModal = ({ apartment, mousePosition }) => {
  return (
    <div
      className="relative w-[230px] h-[330px] z-20  rounded-lg overflow-hidden shadow-lg bg-white"
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y - 10 + "px",
        left: mousePosition.x + 20 + "px",
      }}
    >
      <div className="w-full flex flex-col ">
        <div className="  w-full flex bg-black p-3 justify-between items-start">
          <h1 className="text-lg md:text-xl font-semibold text-brand mb-2 montserrat">
            Tipi {apartment?.name} - {apartment?.sqft}m<sup>2</sup>{" "}
          </h1>
        </div>
        <div className="w-full flex flex-col justify-between items-start p-4">
          <div className=" text-black">
            <p className="text-sm md:text-lg montserrat">
              Dhoma:{" "}
              <span className="font-semibold">{apartment?.bedroom}+1</span>
            </p>
            <p className="text-sm md:text-lg montserrat">
              Kati: <span className="font-semibold">{apartment?.floor}</span>
            </p>
          </div>

          <img
            src={`${homepage}${planmetricImageUrl}${apartment?.image}`}
            alt={apartment?.title}
            className="w-full h-[140px] object-contain mt-2"
            onClick={apartment?.navigateTo}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentModal;
