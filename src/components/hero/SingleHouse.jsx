import { useRef } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import "./style.css";
import { pdfPath } from "../../utils/consts";

const SingleHouse = ({ house, active, setActive, navigate }) => {
  const imageRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  if (!house) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  const {
    type,
    pdfUrl,
    totalSquare = 0,
    numberOfRooms,
    totalNetoSquare = 0,
  } = house;

  const images = [
    `/projektet/assets/images/renderat/Villas/T3BDV-2D.png`,
    `/projektet/assets/images/renderat/Villas/T3BV-2D.png`,
    // `/projektet/assets/images/renderat/Villas/T4BV-2D.png`,
    // `/projektet/assets/images/renderat/Villas/WVD-2D.png`,
  ];

  const buttons = [
    { label: "1" },
    { label: "2" },
    // { label: "3" },
    // { label: "4" },
  ];

  const scrollToImage = (index) => {
    const imageIndex = parseInt(index) - 1;
    const imageElement = imageRefs.current[imageIndex];
    if (imageElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();
      const scrollTop = imageRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const handleButtonClick = (label) => {
    setActive(label);
    scrollToImage(label);
  };

  return (
    <div className='w-full h-full bg-white flex flex-col items-center justify-center'>
      {/* <div className="h-76 w-full relative">
        <img src="/projektet/assets/images/hero/Palasa-Prerjet.png" alt="" className="w-full h-full object-center object-cover absolute" />
        <div className="w-full h-full bg-black/60 absolute top-0 left-0 flex flex-col items-center justify-center gap-4 text-white">
          <h1 className="text-5xl">Premium Villa</h1>
          <h1 className="text-2xl font-semibold">{house?.name} - {house?.totalSquare.toFixed(2)}m<sup>2</sup></h1>
        </div>
      </div> */}
      <div className="w-11/12 h-screen z-1 flex flex-col-reverse md:flex-row items-center scroller-thin">
        <div className="h-screen text-secondary flex flex-col items-center justify-center gap-4 pb-8 md:pb-0 w-full md:w-3/12 md:sticky md:top-0 h-fit">
          <div className='hidden w-full md:flex items-center gap-4 pb-8'>
            <button onClick={() => navigate(-1)} className=' cursor-pointer bg-secondary/60 hover:bg-secondary transition-all duration-300 hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
              <SlArrowLeft color='#fff' />
            </button>
            <h1 className='valky text-secondary text-lg'>Go back</h1>
          </div>
          <div className='w-full flex flex-col items-center gap-4 py-4'>
            <div className='hidden md:flex w-full items-start justify-between gap-4 py-4'>
              <p className='text-6xl valky'>{totalNetoSquare.toFixed(2)}m<sup>2</sup></p>
            </div>
            <div className='w-full flex justify-between items-center mt-2'>
              <p className='text-lg md:text-xl axiforma-thin'>Type</p>
              <p className='text-xl md:text-2xl valky'>{type}</p>
            </div>
            <div className='w-full flex justify-between items-center mt-2'>
              <p className='text-lg md:text-xl axiforma-thin'>Rooms</p>
              <p className='text-xl md:text-2xl valky'>{numberOfRooms}</p>
            </div>
            <div className='w-full flex justify-between items-center mt-2'>
              <p className='text-lg md:text-xl axiforma-thin'>Total Area</p>
              <p className='text-xl md:text-2xl valky'>{totalSquare}m<sup>2</sup></p>
            </div>
            <div className='w-full flex justify-between items-center mt-2'>
              <p className='text-lg md:text-xl axiforma-thin'>Net Area</p>
              <p className='text-xl md:text-2xl valky'>{totalNetoSquare}m<sup>2</sup></p>
            </div>
          </div>
          <button className="relative uppercase inline-flex items-center justify-center w-full px-12 py-3 overflow-hidden axiforma-thin text-white bg-secondary rounded-lg group">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-tertiary rounded-full group-hover:w-124 group-hover:h-124"></span>
            <span className="relative">Book appointment</span>
          </button>
          <button
            onClick={() => window.open(`${pdfPath}${pdfUrl}`, "_blank")}
            className="relative uppercase inline-flex items-center justify-center w-full px-12 py-3 overflow-hidden axiforma-thin text-secondary bg-transparent rounded-lg border border-[#0E375240]">
            PDF
          </button>
        </div>
        <div className='w-full md:w-9/12 h-screen flex flex-col md:items-center justify-start relative'>
          <div className="z-1000 absolute top-10 md:top-18 bg-gray-200 rounded-full flex items-center text-sm font-medium">
            {buttons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleButtonClick(btn.label)}
                className={`px-3 md:px-6 py-2 md:py-4 transition ${active === btn.label
                  ? "bg-secondary text-white rounded-full"
                  : "text-secondary hover:bg-gray-300 rounded-full"
                  }`}
              >
                Floor {btn.label}
              </button>
            ))}
          </div>
          <div ref={scrollContainerRef} className="flex flex-col gap-24 pt-20 md:pt-28 pb-20 snap-y snap-mandatory overflow-y-auto h-screen scroller-thin">
            {images.map((img, i) => (
              <img
                key={i}
                ref={(el) => imageRefs.current[i] = el}
                src={img}
                className=" snap-center h-[500px] md:h-[700px] object-contain mx-auto"
              />
            ))}
          </div>
        </div>
        <div className='w-11/12 md:hidden flex items-center justify-center py-4 gap-4'>
          <p className='text-secondary text-4xl valky'>{totalSquare}m<sup>2</sup></p>
        </div>
        <div className='w-full md:hidden flex items-center gap-4 pt-12'>
          <button onClick={() => navigate(-1)} className=' cursor-pointer bg-secondary transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center'>
            <SlArrowLeft color='#fff' />
          </button>
          <h1 className='valky text-secondary text-base'>Go back</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleHouse;