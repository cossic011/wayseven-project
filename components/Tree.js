import React from "react";
import Article from "./Article";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

const Tree = ({ treeData }) => {
  const [typeFilter, setTypeFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState(" ");
  const [singleItem, setSingleItem] = useState({});

  const getItemById = async (id) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/collections/${id}`
    );
    localStorage.setItem("itemById", JSON.stringify(data.filteredItem[0]));
    setSingleItem((prevState) => ({
      ...prevState,
      ...JSON.parse(localStorage.getItem("itemById")),
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-[30%] pt-4 pr-6 border-r border-r-gray-400">
        <form className="flex items-center space-x-8 justify-between">
          <div className="radioDiv">
            <input
              type="radio"
              id="all"
              name="collection"
              value="all"
              onChange={(e) => setTypeFilter(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="all">All</label>
          </div>
          <div className="radioDiv">
            <input
              type="radio"
              id="painting"
              name="collection"
              value="painting"
              onChange={(e) => setTypeFilter(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="painting">Painting</label>
          </div>
          <div className="radioDiv">
            <input
              type="radio"
              id="potery"
              name="collection"
              value="potery"
              onChange={(e) => setTypeFilter(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="potery">Potteries</label>
          </div>
        </form>
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-300 rounded-lg py-1 px-2 w-full outline-none focus:border-gray-400 my-4"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <div>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5" />
            {treeData?.name}
          </div>
          {treeData?.collection.map((item) => (
            <>
              <div key={item.id} className="flex items-center mx-6">
                <ChevronRightIcon className="h-5 w-5" />
                {item.name}
              </div>
              {item.collection.map((article) => {
                if (
                  article.type === typeFilter &&
                  article.name.toLowerCase().includes(searchFilter)
                ) {
                  return (
                    <div
                      className={`mx-16 cursor-pointer hover:underline ${
                        singleItem.id === article.id
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                      key={article.id}
                      onClick={() => getItemById(article.id)}
                    >
                      {article.name}
                    </div>
                  );
                } else if (
                  typeFilter === "all" &&
                  article.name.toLowerCase().includes(searchFilter)
                ) {
                  return (
                    <div
                      key={article.id}
                      onClick={() => getItemById(article.id)}
                      className={`mx-16 cursor-pointer hover:underline ${
                        singleItem.id === article.id
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      {article.name}
                    </div>
                  );
                }
              })}
            </>
          ))}
        </div>
      </div>
      <div className="flex-[70%] mt-4">
        <Article singleItem={singleItem} setSingleItem={setSingleItem} />
      </div>
    </div>
  );
};

export default Tree;
