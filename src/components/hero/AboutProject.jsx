import React from "react";

const AboutProject = () => {
  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center py-6 md:py-48">
      <div className="w-11/12 md:w-5/6 text-black text-start flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <div className="w-full md:w-1/2">
          <img
            src="/assets/images/renderat/011pp.jpg"
            alt=""
            className="w-full contain rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/2  p-4 flex flex-col justify-center gap-4">
          <h1 className="certon text-xl md:text-5xl mb-6">
            Një Histori e Ndërtuar mbi Cilësinë dhe Inovacionin
          </h1>
          <p className="text-sm md:text-base montserrat text-text">
            Me një infrastrukturë të zhvilluar dhe mundësi për aktivitete të
            ndryshme, ky lokacion është ideal për ata që kërkojnë një balancë të
            përsosur midis jetës urbane dhe natyrës. Ndërtesat e Foleja Living
            janë ndërtuar me një vizion modern dhe të qëndrueshëm, duke ofruar
            hapësira të mëdha dhe komoditet të lartë. Çdo apartament është
            projektuar me kujdes dhe me materialet më cilësore për të siguruar
            një jetesë të rehatshme dhe funksionale. Pamjet që ofrohen nga këto
            ndërtesa janë të jashtëzakonshme, duke ju mundësuar të shijoni
            peizazhe të bukura që shtrihen përtej qytetit.
          </p>
          <button className="px-12 py-2 border border-brand transition-nav bg-brand text-gold  rounded-full w-1/2 text-nowrap">
            Shiko Projektet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
