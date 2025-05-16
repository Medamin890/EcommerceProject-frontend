import React from "react";
import ShowSearch from "./ShowSearch";
import { Slider } from "antd";
import { IoFilter } from "react-icons/io5";
import { MdSort } from "react-icons/md";

const categories = ['Men', 'Women', 'Kids', 'Electronics', 'Cosmetics'];
const subCategories = {
  Men: ['Topwear', 'Bottomwear', 'Winterwear'],
  Kids: ['Topwear', 'Bottomwear', 'Winterwear'],
  Women: ['Topwear', 'Bottomwear', 'Winterwear'],
  Electronics: ['Phone', 'PC', 'Headphones'],
  Cosmetics: ['Care', 'Perfume'],
};

const LeftSide = ({ setCategory, toggleSubCategory,setSortType, setPriceRange, priceRange, maxPrice, selectedCategory }) => {
  return (
    <section className="min-w-60 bg-white p-4 rounded-2xl pt-4 gap-y-4">

      {/* 🔍 Search Box */}
      <ShowSearch />

      {/* 📁 Category Filter */}
      <div className="bg-primary ring-1 ring-slate-900/5 px-5 py-3 rounded-xl">
       
        <h5 className="h5 mb-4 flex gap-2"> <IoFilter /> Categories</h5>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={selectedCategory}
          className="w-full border h-9 border-gray-300 text-sm rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="text-gray-30" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category} >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* 📂 Subcategory Filter */}
      {selectedCategory && (
      <div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 rounded-xl">
        <h5 className="h5 mb-4">Subcategories</h5>
        <div className="flex flex-col gap-2 text-sm font-light">
          {subCategories[selectedCategory]?.map((subCat) => (
            <label key={subCat} className="flex gap-2 medium-14 text-gray-30">
              <input
                type="checkbox"
                value={subCat}
                onChange={(e) => toggleSubCategory(e.target.value)}
                className="w-3 cursor-pointer hover:scale-125 transform duration-200"
              />
              {subCat}
            </label>
          ))}
        </div>
        </div>
      )}

      {/* 💲 Price Range Filter */}
      <div className="bg-primary ring-1 ring-slate-900/5 p-5 py-3 rounded-xl mt-4">
            <h5 className="h5 mb-4">Price Range</h5>
            <Slider
              range={{
                draggableTrack: true,
              }}
              min={0}
              max={maxPrice}
              value={[priceRange.min, priceRange.max]}
              onChange={(value) => setPriceRange({ min: value[0], max: value[1] })}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>Min: ${priceRange.min}</span>
              <span>Max: ${priceRange.max}</span>
            </div>
          </div>

      {/* 🔄 Sort By Filter */}
      <div className="bg-primary ring-1 ring-slate-900/5 p-5 py-3 rounded-xl mt-4">
        <h5 className="h5 mb-4 flex gap-1"><MdSort />Sort By</h5>
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="w-full border h-9 border-gray-300 text-sm rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="low">Sort by: Low to High Price</option>
          <option value="high">Sort by: High to Low Price</option>
        </select>
      </div>
    </section>
  );
};

export default LeftSide;
