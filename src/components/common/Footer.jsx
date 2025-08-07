import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gold w-full h-full flex flex-col items-center justify-between py-[6%] px-5 text-white">
      <div className="w-11/12 h-full flex flex-col md:flex-row items-start justify-between mb-5 gap-[50px]">
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-20">
          <h1 className="certon text-3xl md:text-7xl text-white">
            Foleja Group
          </h1>
          <div class="flex items-center bg-black bg-opacity-30 rounded-full p-1 w-full max-w-md">
            <input type="email" placeholder="Emaili juaj..." class="flex-grow bg-transparent text-white placeholder-white px-4 py-2 focus:outline-none text-sm md:text-base"/>
              <button class="bg-white text-gold font-medium px-4 py-2 rounded-full shadow-md text-nowrap text-sm md:text-base">
                Abonohu
              </button>
          </div>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-4 items-center justify-between text-start">
          <div className="w-full h-full flex gap-2 items-start justify-between">
            <h1 className="mb-2 w-1/2 montserrat text-nowrap">Kontakt</h1>
            <div className="flex w-1/3 flex-col gap-1">
              <p className="montserrat text-nowrap">email</p>
              <p className="montserrat text-nowrap">+ 38383497700</p>
            </div>
          </div>
          <div className="w-full h-full flex items-start justify-between">
            <h1 className="mb-2 w-1/2 montserrat text-nowrap">Zyrja Kryesore</h1>
            <div className="flex w-1/3 flex-col gap-1">
              <p className="montserrat text-nowrap">foleja address</p>
            </div>
          </div>
          <div className="w-full h-full flex items-start justify-between">
            <h1 className="mb-2 w-1/2 montserrat text-nowrap">Qendra e shitjes</h1>
            <div className="flex w-1/3 flex-col gap-1">
              <p className="montserrat text-nowrap">foleja address</p>
            </div>
          </div>
          <div className="w-full h-full flex items-start justify-between">
            <h1 className="mb-2 w-1/2 montserrat text-nowrap">Linqet</h1>
            <div className="flex w-1/3 flex-col gap-2">
              <NavLink
                to="/"
                className="hover:text-[var(--brand-color)] transition-all capitalize duration-300 montserrat text-nowrap"
              >
                Ballina
              </NavLink>
              <NavLink
                to="/about-us"
                className="hover:text-[var(--brand-color)] transition-all capitalize duration-300 montserrat text-nowrap"
              >
                Rreth nesh
              </NavLink>
              <NavLink
                to="/contact-us"
                className="hover:text-[var(--brand-color)] transition-all capitalize duration-300 montserrat text-nowrap"
              >
                Kontakti
              </NavLink>
              <NavLink
                to="/apartments"
                className="hover:text-[var(--brand-color)] transition-all capitalize duration-300 montserrat text-nowrap"
              >
                apartmentet
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 flex items-center justify-center mt-10">
        <img src="/assets/images/brand/logo.svg" alt="logo" className="h-10" />
      </div>
    </div>
  );
};

export default Footer;
