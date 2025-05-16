import React, { useState } from "react";
import Title from "../Home/Title";
import Item from "../Product/Items";
import {Pagination } from "antd"; // Import Pagination component from Ant Design
import SortMenu from "./SortMenu";

const RightSide = ({ toggleModal,setSortType,filteredProducts, ClassName }) => {
  console.log("filteredProducts rs:", filteredProducts);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const pageSize = 8; // Number of items per page
  const showTotal = (total) => `Total ${total} items`;

  // Calculate the current page products
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={ClassName}>
      {/* Product Container */}
      <div className="flex-1">
        <Title title={"Filtered product"} pb={"!pb-8"} />
        {/* Sort bar and Pagination */}
        <div className="flex justify-between items-center outline-1 outline p-2 rounded-md px-4 outline-secondary bg-white">
            {/* Pagination */}
            <Pagination
              current={currentPage} // Current page
              pageSize={pageSize} // Items per page
              total={filteredProducts.length} // Total number of items
              onChange={handlePageChange} // Page change handler
              showTotal={showTotal}
              showSizeChanger
              showQuickJumper       
            />
          {/* 🔄 Sort By Filter */}
            <SortMenu setSortType={setSortType}/>
        </div>

        {/* Filtered List of Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 py-3">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => <Item product={product} key={product._id} toggleModal={toggleModal} />)
          ) : (
            <p className="capitalize justify-center">No products found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
