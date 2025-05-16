import { useContext, useEffect, useState } from "react";
import LeftFilterBar from "../components/Collection/LeftFilterBar";
import { TbArrowRight } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
import RightSideFiltredProducts from "../components/Collection/RightSideFiltredProducts";

const ProductPage = ({toggleModal}) => {
  const [filtersAttributs, setFiltersAttributs] = useState({});
  const { category, subCategory, subSubCategory } = useParams(); // Extract from URL
  const { all_products, search, showSearch } = useContext(ShopContext);
  const [sortType, setSortType] = useState("relevant");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 }); // Price range filter
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0); // Store the highest price
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Get all colors to send to the LeftFilterBar
  const colors = [
    "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink",
    "Black", "White", "Gray", "Brown", "Cyan", "Magenta",
    "Gold", "Silver", "Teal", "Navy", "Maroon", "Olive",
    "Turquoise", "Beige", "Coral", "Lavender", "Indigo"
  ];

  // Get the warranties to send to the LeftFilterBar
  const warranties = all_products.map((product) => product.details?.waranty   && product.details.waranty).filter((value, index, self) => self.indexOf(value) === index);

  // Get the  brands to send to the LeftFilterBar
  const brandMap = new Map();


  // Filter products based on subCategory or subSubCategory
  // and normalize the brand names
  all_products
    .filter((product) =>
      subSubCategory
        ? subSubCategory === product.subSubCategory
        : subCategory === product.subCategory
    )
    .forEach((product) => {
      // Normalize by trimming and converting to uppercase (or lowercase)
      const normalized = product.brand.trim().toUpperCase();
      if (!brandMap.has(normalized)) {
        brandMap.set(normalized, product.brand); // store the original brand
      }
    });
  
  const brands = Array.from(brandMap.values());
  
  // Handle the change of the filters
  const handleFilterChange = (selectedFilters) => {
    setFiltersAttributs(selectedFilters);
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...all_products];
    // If no filters are applied, show all products

    // Search Filter
    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // subCategory Filters
    if (subCategory) {
      filtered = filtered.filter((product) => product.subCategory === subCategory);
    }

    // subSubCategory filters
    if (subSubCategory) {
      filtered = filtered.filter((product) => product.subSubCategory === subSubCategory);
    }

    // Price Range Filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    
    // Attribute Filters
    if (Object.keys(filtersAttributs).length > 0) {
      filtered = filtered.filter((product) => {
        return Object.entries(filtersAttributs).every(([attribute, values]) => {
          // Special case for "Brands"
          if (attribute === "Brands") {
            return filtersAttributs.Brands.includes(product.brand);
          }
          // For other attributes, ensure they exist in product.details
          if (!product.details || !product.details[attribute]) return false;
          const productValue = product.details[attribute];
          if (Array.isArray(productValue)) {
            return productValue.some(val => values.includes(val));
          }
          return values.includes(productValue);
        });
      });
    }
    


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
    console.log("Filtered products:", filtered);
    filtered = applySorting(filtered);
    setFilteredProducts(filtered);

    //Dynamically set max price from all products
    if (all_products.length > 0) {
      const highestPrice = Math.max(...all_products.map((product) => product.price));
      setMaxPrice(highestPrice);

      if (priceRange.max === 0) {
        setPriceRange({ min: 0, max: highestPrice });
      }
    }
  }, [filtersAttributs, category, subCategory, subSubCategory, sortType, priceRange.min, priceRange.max, all_products, search, showSearch]);

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
    <div className="flex mt-14 md:mt-28 px-8 left-0 flex-col h-max bg-gray-100">
      {/* Tabulation navigate */}
      <div className='rounded-tl-xl rounded-tr-xl flex items-center flex-wrap gap-x-2 medium-16 p-6 pl-8 pt-9 capitalize'>
        <>
          <Link to={'/'} className='hover:text-blue-500'>Home</Link>
          <TbArrowRight />
          <Link to={'/collection'} className='hover:text-blue-500'>collection</Link>
          {category && subCategory && (
            <>
            <TbArrowRight />
            <Link to={`/collection/${category}/${subCategory}`} className="hover:text-blue-500">
            {category} / {subCategory}
              </Link>
            </>
          )} 
          {subSubCategory && (
            <>
              <TbArrowRight />
              <Link to={`/collection/${category}/${subCategory}/${subSubCategory}`} className="hover:text-blue-500">
                {subSubCategory}
              </Link>
            </>
          )}
        </>
      </div>
      <div className={"w-full flex gap-x-3 " + `${isMobile ? " -ml-2 py-11 flex-col gap-8 " : " flex-row pb-7"}`}>
        {/* LeftFilterBar */}
        <LeftFilterBar 
          category={category}
          subCategory={subCategory} 
          subSubCategory={subSubCategory} 
          onFilterChange={handleFilterChange}
          setPriceRange={setPriceRange} 
          priceRange={priceRange}
          maxPrice={maxPrice}
          colors={colors}
          warranties={warranties}
          brands={brands}
        />
        {/* RightSide for Display the filtered Products */}
        <RightSideFiltredProducts 
          toggleModal={toggleModal}
          filteredProducts={filteredProducts}
          setSortType={setSortType}
          ClassName={"bg-primary p-4 rounded-2xl flex w-full flex-col ml-2 " + `${isMobile ? "" : "overflow-y-auto"}`}
        />
      </div>
    </div>
  );
};

export default ProductPage;