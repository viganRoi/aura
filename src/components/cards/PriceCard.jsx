import React, { useState }  from "react";
import { IoCloseOutline } from "react-icons/io5";

const PriceCard = ({ onClose }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="fixed w-full h-screen top-0 bg-brand bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-brandD  px-6 py-28 border border-gold rounded-lg max-w-md w-full relative text-white">
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-white text-2xl z-50" onClick={onClose}>
                    <IoCloseOutline />
                </button>
                {/* Title */}
                <h2 className="text-center text-lg font-semibold uppercase pb-4 border-b border-gold">
                    Leave the coordinates - and we will contact you!
                </h2>
                {/* Form */}
                <form className="mt-6 space-y-4 md:space-y-6">
                    <div>
                        <label className="block text-sm mb-1 text-gold certon">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border-b border-gold bg-black bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gold certon">Phone</label>
                        <input
                            type="text"
                            className="w-full p-2 border-b border-gold bg-black bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="+383 (   )"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gold certon">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border-b border-gold bg-black bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    {/* Interest Text */}
                    <p className="text-sm mt-2 certon text-gold">
                        Foleja Living
                    </p>
                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            id="consent"
                            className="w-4 h-4"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="consent" className="text-xs">
                            I consent to the processing of my personal data according to the{" "}
                            <a href="#" className="underline">
                                Privacy Policy.
                            </a>
                        </label>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 p-2 bg-gold text-brand font-semibold rounded-md hover:bg-gray-500 transition"
                    >
                        SEND
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PriceCard;