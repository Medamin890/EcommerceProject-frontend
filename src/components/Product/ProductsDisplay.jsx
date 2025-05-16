import React, { useContext } from "react";
import { ShopContext } from "../../pages/context/ShopContext";
import Item from "./items";

const ProductDisplay = ({category,toggleModal}) => {
  const {all_products} = useContext(ShopContext)
  return (
    <section className="max-padd-container py-14 ">
      {/* Title */}
      <div className=" mb-12">
        <h4 className="text-4xl font-extrabold leading-none font-ace flex flex-col">
          <span className="text-gray-500 text-lg block medium-20">The</span>
          Products
        </h4>
      </div>
      
    {/* Container */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
      {all_products.map((product) => {
        //  Filter products based on the selected category
        if(category === "All" || category === product.category){
          return( <div key={product._id} >
                    <Item product={product} toggleModal={toggleModal} />
                  </div>
                );
        }
      })}
    </div>
    </section>
  );
};

export default ProductDisplay;
