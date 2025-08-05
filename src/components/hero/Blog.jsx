import React from "react";
import { useNavigate } from "react-router-dom";
import { news } from "../../utils/server";
import { NewsCard } from "../";

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center py-6 md:py-12">
      <div className="w-11/12 md:w-5/6 text-black text-start">
        <p className="text-sm md:text-base">Eksploro</p>
        <h1 className="certon text-xl md:text-3xl">
          Të gjitha të rejat nga ne
        </h1>
      </div>
      <div className="w-11/12 md:w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4 md:mt-10">
        {news.map((el) => (
          <NewsCard
            key={el.id}
            image={el.image}
            date={el.date}
            title={el.title}
            content={el.desc}
            navigateTo={() => navigate(`/news/${el.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
