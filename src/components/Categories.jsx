// Import necessary dependencies
import React from 'react';
import { categories } from '../assets/data'; // Assuming your data file is named `data.js`

const CategoriesGrid = ({ category, setCategory }) => {
 
  // Define the function to handle category selection
  // With Toggling (setCategory((prev) => (prev === itemName ? "All" : itemName));):
  // If you click the already selected category, it resets to "All," creating a toggle effect
  const handsetcategory = (itemName) => {
    setCategory((prevCategory) => (prevCategory === itemName ? "All" : itemName));
  };
  return (
    <section  className="max-padd-container py-14">
      {/* Title */}
      <div className="flexBetween mb-12">
        <h4 className="text-4xl font-extrabold leading-none font-ace flex flex-col">
          <span className="text-gray-500 text-lg block medium-20">Shop by</span>
          Categories
        </h4>
      </div>
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((item) => (
          <div 
            onClick={() => handsetcategory(item.name)} // Call the handler with the item's name
            key={item.name}
            className="flex flex-col items-center p-4 bg-primary rounded-3xl cursor-pointer hover:shadow-lg hover:shadow-gray-300"
          >
            {/* Adjust image styles to remove top space */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="object-cover h-32 w-32 mb-4" 
            />

            <h4
              className={`text-lg font-semibold text-gray-800 ${ 
                category === item.name
                 ? "border-b-4  border-secondary"
                 : "border-b-4  border-primary"
              }`}
            > 
              {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
