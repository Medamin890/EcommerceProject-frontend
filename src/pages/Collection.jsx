import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import LeftSide from "../components/Collection/leftSide";
import RightSide from "../components/Collection/RightSide";

const Collection = () => {
  const { all_products, search, showSearch } = useContext(ShopContext);
  const [category, setCategory] = useState(""); // Single category selection
  const [subCategory, setSubCategory] = useState([]); // Multiple subcategory selections
  const [sortType, setSortType] = useState("relevant");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 }); // Price range filter
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0); // Store the highest price
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // Toggle subcategory filter
  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };


  // Apply filters
  const applyFilters = () => {
    let filtered = [...all_products];

    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (subCategory.length) {
      filtered = filtered.filter((product) => subCategory.includes(product.subCategory));
    }
    // if (subSubCategory.length) {
    //   filtered = filtered.filter((product) => subSubCategory.includes(product.subSubCategory));
    // }


    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    return filtered;
  };

  // Apply sorting
  const applySorting = (productsList) => {
    switch (sortType) {
      case "low":
        return productsList.sort((a, b) => a.price - b.price);
      case "high":
        return productsList.sort((a, b) => b.price - a.price);
      default:
        return productsList;
    }
  };

  // Update filtered products and adjust price range dynamically
  useEffect(() => {
    let filtered = applyFilters();
    filtered = applySorting(filtered);
    setFilteredProducts(filtered);

    // Dynamically set max price from all products
    if (all_products.length > 0) {
      const highestPrice = Math.max(...all_products.map((product) => product.price));
      setMaxPrice(highestPrice);

      if (priceRange.max === 0) {
        setPriceRange({ min: 0, max: highestPrice });
      }
    }
  }, [category, subCategory, sortType, priceRange.min, priceRange.max, all_products, search, showSearch]);

  // Handle screen size changes
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 825) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <section className="flex w-full bg-slate-100 pt-3">
      <div className={"w-full flex pt-28"+`${isMobile ? " -ml-2 py-11 flex-col gap-8 " : "  h-screen flex-row  pb-7"}`}>
        <LeftSide
          setCategory={setCategory}
          toggleSubCategory={toggleSubCategory}
          setSortType={setSortType}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
          maxPrice={maxPrice}
          selectedCategory={category}
        />
        <RightSide
          filteredProducts={filteredProducts}
          ClassName={" bg-white p-4 rounded-2xl flex w-full  flex-col ml-2 "+`${isMobile ? "" : "overflow-y-auto"}`}
        />
      </div>
    </section>
  );
};

export default Collection;
