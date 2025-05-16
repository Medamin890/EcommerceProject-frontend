import React from "react";
import Title from "../Home/Title";
import Item from "../Product/Items";

const RightSide = ({ filteredProducts,ClassName }) => {
  return (
    <div className={ClassName}>
    
      {/* Product Container */}
      <div className="flex-1">
       <Title title={"Our Collection"} />
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <Item product={product} key={product._id} />)
          ) : (
            <p className="capitalize justify-center">No products found for selected filters.</p>
          )}
       </div>
    </div>
    </div>
  );
};

export default RightSide;
