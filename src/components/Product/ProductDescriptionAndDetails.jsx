import React, { useContext, useState } from "react";
import { Segmented } from "antd";
import ProductReview from "./ProductReview";


const ProductDescriptionAndDetails = ({ product }) => {
  const [selectedSegment, setSelectedSegment] = useState("Description");
  const handleSegmentChange = (value) => {
    setSelectedSegment(value);
  };

  return (
    <section className="  mt-20 ">
      <Segmented
        className="custom-segmented flex max-w-max !rounded-none"
        style={{ color: "white", background: "black"}}
        options={["Description", "Details", "Reviews"]}
        value={selectedSegment}
        onChange={handleSegmentChange}
        
      />
      <div className="border ">
        {/* Description Section */} 
        {selectedSegment === "Description" && 
          Array.isArray(product.details.DescriptionSection) &&(
          <div className="flex flex-col items-center text-center  gap-4 py-8  animate-fadeIn ">
            <p className="text-xl font-semibold flex -mb-2 text-blue-500 w-full justify-center">{product.name}</p>
            {product.details.DescriptionSection.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center w-full">
                <p className="text-lg font-semibold text-black mb-[3px]">{item.itemDescription}</p>
                <img
                  src={item.itemImage}
                  alt={`Description ${index}`}
                  className="w-[70%] h-[70%] rounded-lg shadow-lg"
                  />
              </div>
          ))}
          </div>
        )}

        {/* Details Section with a Table */}
        {selectedSegment === "Details" && (
          <div className="flex flex-col py-6  animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">Technical Sheet</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {Object.entries(product.details)
                    .filter(([key]) => key !== "DescriptionSection") // Exclude DescriptionSection
                    .map(([key, value], index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        <td className="px-4 py-3 font-semibold border border-gray-300 w-[30%]">{key}</td>
                        <td className="px-4 py-3 border border-gray-300 w-full">
                          {typeof value === "boolean" ? (value ? "Yes" : "No") : Array.isArray(value) ? value.join(", ") : value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {selectedSegment === "Reviews" && (
          <div className="flex flex-col justify-center pb-16 animate-fadeIn">
              <ProductReview productId={product._id} />
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductDescriptionAndDetails;
