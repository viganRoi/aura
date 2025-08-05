import React from "react";
import { Blog, TitleSection } from "../components";

const BlogPage = () => {
  window.scrollTo({ top: 0 });
  return (
    <div className="mb-12">
      <TitleSection title={"Lajme"} image={"/assets/images/apartments/1.jpg"} />
      <Blog />
    </div>
  );
};

export default BlogPage;
