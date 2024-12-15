import { useStateValue } from "@/context";
import React, { memo } from "react";

import { TbHeartPlus } from "react-icons/tb";
import { BsCartPlus } from "react-icons/bs";

const Products = ({ data, title }) => {
  let [state, dispatch] = useStateValue();

  let items = data?.map((product, inx) => (
    <div
      className="border dark:border-gray-600 dark:hover:border-slate-300 hover:border-black hover:shadow-md duration-300 cursor-pointer p-3"
      key={inx}
    >
      <div className="w-full h-60 bg-gray-200">
        <img
          className="w-full h-full object-contain"
          src={product?.images[0]}
          alt="Photo"
        />
      </div>
      <p className="mt-2 leading-6 text-[1rem] dark:text-slate-200">
        {product.title}
      </p>
      <p className="mt-2 leading-5 text-sm line-clamp-2 text-slate-800 dark:text-slate-300">
        {product.description}
      </p>
      <div className="flex justify-between items-center mt-2">
        <strong>
          <span className="text-green-800 dark:text-green-500">
            {product.price} $
          </span>
        </strong>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "ADD_WISH_ITEM", product })}
            className="p-2 rounded-full hover:bg-sky-400 text-[1rem] bg-sky-300 duration-200"
          >
            <TbHeartPlus />
          </button>

          <button
            onClick={() => dispatch({ type: "ADD_CART_ITEM", product })}
            className="p-2 rounded-full hover:bg-green-400 text-[1rem] bg-green-300 duration-200"
          >
            <BsCartPlus />
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container mx-auto">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {items}
      </div>
    </div>
  );
};

export default memo(Products);
