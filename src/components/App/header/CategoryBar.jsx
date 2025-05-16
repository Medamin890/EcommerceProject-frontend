import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const navigate =  useNavigate();
  const categories = [
    {
      name: "Computer",
      subCategories: [
        {
          name: "Pc Normal & Pro",
          subSubCategories: ["Desktop Pc", "Portable Pc", "Mac Book Pc"],
        },
        {
          name: "Pc Gamer",
          subSubCategories: ["Desktop Gamer Pc", "Portable Gamer Pc"],
        },
        {
          name: "Pc Accessories",
          subSubCategories: ["Charger Pc", "keyboard", "Mouse", "Headphones Pc"],
        },
      ],
    },
    {
      name: "Phones & Tablets",
      subCategories: [
        { name: "Phone", subSubCategories: [] },
        { name: "Tablet", subSubCategories: [] },
        {
          name: "Phones Accessories",
          subSubCategories: ["Ecouter", "Charger", "Powerbank"],
        },
      ],
    },
    {
      name: "Household Appliances",
      subCategories: [
        { name: "Washing Machine", subSubCategories: [] },
        { name: "Air Conditioner", subSubCategories: [] },
        { name: "Refrigerator", subSubCategories: [] },
        { name: "TV", subSubCategories: [] },
      ],
    },
    {
      name: "Cosmetics",
      subCategories: [
        { name: "Perfume", subSubCategories: [] },
        { name: "Care", subSubCategories: [] },
      ],
    },
  ];
  
  return (
    <section className=" group bg-secondary flex w-full flexCenter text-white  shadow-lg">
      <div >
      <nav >
        <div className=" grid  grid-cols-4 gap-4  text-center w-full">
        {categories.map((category) => (
            <div
              key={category.name}
              className=" cursor-pointer group w-full py-5"
              onMouseEnter={() => setOpenCategory(category.name)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <span className="hover:text-slate-500  animation-btn">{category.name}</span>
            </div>
          ))}
        </div>
      </nav>
      {openCategory && (
        <div
          className="absolute flex flexCenter  top-full left-0 w-screen bg-white text-gray-900 shadow-md border-b-2 border-secondary animate-slideDown z-50"
          onMouseEnter={() => setOpenCategory(openCategory)}
          onMouseLeave={() => setOpenCategory(null)}
        >
          <div className="flex flex-row gap-x-8 p-4  ">
            {categories
              .find((cat) => cat.name === openCategory)
              ?.subCategories.map((sub) => (
                <ul key={sub.name} className="w-48">
                  <li>
                    <button 
                      onClick={() => {
                        navigate(`/collection/${openCategory}/${sub.name}`);
                        setOpenCategory(null);
                      }}
                      className="block p-2 underline text-secondary hover:text-blue-500 animation-btn"
                    >
                      {sub.name}
                    </button>
                  </li>
                  {sub.subSubCategories.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => {
                          setOpenCategory(null);
                          navigate(`/collection/${openCategory}/${sub.name}/${item}`);
                        }}
                       className="block p-2 text-slate-600 hover:text-blue-500 animation-btn"
                       >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
          </div>
      </div>
      )}
      </div>
    </section>
  );
};

export default DropdownMenu;
