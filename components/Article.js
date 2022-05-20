import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";

const Article = ({ singleItem, setSingleItem }) => {
  const router = useRouter();

  useEffect(() => {
    setSingleItem((prevState) => ({
      ...prevState,
      ...JSON.parse(localStorage.getItem("itemById")),
    }));
  }, []);

  const handleClick = (id) => {
    router.push(`/article/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-[40%] flex justify-center items-center border-b border-gray-300 pb-6">
        <img src={singleItem.url} alt={singleItem.name} className="h-[350px]" />
      </div>
      <div className="flex-[60%] p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[25px]">{singleItem.name}</h1>

          <button
            className="bg-blue-500 text-white py-1.5 px-14 rounded-xl hover:bg-blue-700 transition-all"
            onClick={() => handleClick(singleItem.id)}
          >
            Edit
          </button>
        </div>
        <p className="">{singleItem.description}</p>
      </div>
    </div>
  );
};

export default Article;
