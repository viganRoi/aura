import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentWishlistCard = ({
  id,
  image,
  title,
  navigateTo,
  floor,
  bedroom,
  sqft,
  onRemove,
}) => {
  return (
    <div className="w-full h-[480px] md:h-[450px] relative rounded-lg overflow-hidden shadow-lg bg-white hover:cursor-pointer">
      <img
        src={`${homepage}${planmetricImageUrl}${image}`}
        alt={title}
        className="w-full h-full object-contain"
        onClick={navigateTo}
      />
      {/* <button
        className="absolute top-4 right-4 bg-transparent text-brand px-4 py-1 text-sm border-brand border-[1px] rounded-full hover:shadow-md transition certon"
        onClick={navigateTo}
      >
        360° Vr Tour
      </button> */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-4 right-4 bg-transparent flex text-brand px-4 py-4  text-sm border-brand border-[1px] rounded-full hover:shadow-md transition montserrat"
      >
        <svg
          id="fi_3976961"
          enable-background="new 0 0 512 512"
          height="15"
          viewBox="0 0 512 512"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m421.538 93.322-74.247-17.06 1.748-7.607c5.172-22.514-8.936-45.039-31.448-50.211l-75.648-17.381c-10.871-2.499-22.093-.596-31.599 5.357-9.505 5.953-16.115 15.219-18.613 26.091l-1.748 7.607-74.247-17.06c-22.669-5.211-45.335 8.993-50.541 31.655l-7.204 31.353c-.594 2.585-.137 5.3 1.271 7.547 1.407 2.248 3.65 3.845 6.235 4.438l267.344 61.428h-258.692c-2.817 0-5.504 1.188-7.398 3.272-1.896 2.085-2.824 4.871-2.557 7.676l29.149 305.929c1.936 20.32 18.788 35.644 39.2 35.644h56.165 117.753 56.165c20.412 0 37.265-15.323 39.201-35.644l28.068-294.577 4.108.944c.754.173 1.507.256 2.248.256 4.556 0 8.674-3.134 9.737-7.763l7.204-31.353c2.515-10.943.599-22.239-5.393-31.807-5.99-9.566-15.318-16.219-26.261-18.734zm-39.62 381.137c-.953 10-9.246 17.541-19.291 17.541h-56.165-117.753-56.165c-10.045 0-18.338-7.541-19.29-17.54l-28.106-294.98h324.877zm-170.694-437.47c1.302-5.665 4.76-10.502 9.737-13.619 4.976-3.117 10.833-4.118 16.504-2.815l75.647 17.382c11.766 2.703 19.138 14.475 16.435 26.24l-1.748 7.607-118.323-27.187zm222.477 102.397-4.965 21.606-349.013-80.193 4.965-21.606c2.737-11.914 14.66-19.376 26.57-16.642l221.806 50.964c.001 0 .002.001.003.001s.002 0 .003 0l83.99 19.298c11.913 2.738 19.378 14.658 16.641 26.572zm-121.557 321.134 12.218-250.534c.269-5.517 4.951-9.754 10.476-9.501 5.517.27 9.77 4.959 9.501 10.476l-12.219 250.533c-.261 5.351-4.682 9.513-9.98 9.513-.164 0-.329-.004-.495-.012-5.517-.269-9.77-4.959-9.501-10.475zm-149.093.974-12.217-250.534c-.269-5.517 3.984-10.206 9.501-10.476 5.516-.254 10.207 3.984 10.476 9.501l12.217 250.534c.269 5.517-3.985 10.206-9.501 10.476-.166.008-.331.012-.495.012-5.301 0-9.72-4.162-9.981-9.513zm74.535-.487v-250.534c0-5.522 4.478-10 10-10s10 4.478 10 10v250.534c0 5.522-4.478 10-10 10s-10-4.478-10-10z"></path>
        </svg>
      </button>
      <div className="absolute bottom-4 left-4 text-black montserrat">
        <h1 className="text-[24px] md:text-2xl font-semibold mb-2 montserrat">
          {sqft}m<sup>2</sup>
        </h1>
        <p className="text-[16px] md:text-lg montserrat">
          Tipi: {bedroom}+1 ・ Kati: {floor}
        </p>
      </div>
    </div>
  );
};

export default ApartmentWishlistCard;
