import React from "react";

const ContactSection = () => {
  return (
    <div className="relative w-full h-full md:h-[90vh] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/images/renderat/013pp.jpg')`,
        }}
      ></div>
      <div className="relative w-full max-w-7xl px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-2 md:space-y-6">
          <h4 className="text-sm text-white tracking-widest uppercase">
            Kontakti
          </h4>
          <h2 className="text-4xl font-light text-white leading-tight">
            Find your dream home with Foleja.
          </h2>
          <div className="space-y-2 md:space-y-2 md:space-y-4">
            <div>
              <h5 className="font-bold certon text-white">Kontakti</h5>
              <p className="text-gray-200">info@folejaliving.com</p>
              <p className="text-gray-200">+383 48 401 401</p>
            </div>
            <div>
              <h5 className="font-bold certon text-white">Zyret</h5>
              <p className="text-gray-200">
                Zyre 503, Prishtine,
                <br />
                Mohammed Bin Rashid City, Kosove, UAE
              </p>
            </div>
            <div>
              <h5 className="font-bold certon text-white">Qendra e shitjeve</h5>
              <p className="text-gray-200">
                Zyre 202, Kosove Height Square 1, Kosove Hills Estate,
                <br />
                Mohammad Bin Rashid City, Kosove, UAE
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg text-black">
          <h3 className="text-xl font-bold certon mb-4">Na Kontaktoni</h3>
          <form className="space-y-2 md:space-y-4">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <input
                type="text"
                placeholder="Emri juaj *"
                className="border p-2 md:p-3 rounded w-full"
              />
              <input
                type="text"
                placeholder="Mbiemri juaj *"
                className="border p-2 md:p-3 rounded w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <input
                type="email"
                placeholder="Email adresa *"
                className="border p-2 md:p-3 rounded w-full"
              />
              <input
                type="tel"
                placeholder="Numri i telefonit *"
                className="border p-2 md:p-3 rounded w-full"
              />
            </div>
            {/* <select className="border p-2 md:p-3 rounded w-full">
              <option>Jam i/e interesuar/e për</option>
            </select> */}
            <textarea
              placeholder="Mesazhi juaj..."
              className="border p-2 md:p-3 rounded w-full h-28"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded flex items-center justify-center"
            >
              Dërgo →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
