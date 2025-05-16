import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

const categories = [
  {
    name: "Computer",
    subCategories: [
      {
        name: "Pc",
        subSubCategories: ["Desktop Pc", "Portable Pc", "Mac Book Pc"],
      },
      {
        name: "Pc Gamer",
        subSubCategories: ["Desktop Gamer Pc", "Portable Gamer Pc"],
      },
      {
        name: "Pc Accessories",
        subSubCategories: ["Charger", "Keyboard", "Mouse", "Headphones Pc"],
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
      { name: "Refrigerator", subSubCategories: [] },
      { name: "Air Conditioner", subSubCategories: [] },
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

const CategoryMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu mode="vertical" className="absolute top-44 left-56">
      {categories.map((category) => (
        <SubMenu key={category.name} title={category.name}>
          {category.subCategories.map((sub) => (
            <SubMenu
              key={sub.name}
              title={sub.name}
              onTitleClick={() => navigate(`/collection/${sub.name}`)} // ✅ Now subcategories navigate!
            >
              {sub.subSubCategories.length > 0 ? (
                sub.subSubCategories.map((item) => (
                  <Menu.Item
                    key={item}
                    onClick={() => navigate(`/collection/${sub.name}/${item}`)}
                  >
                    {item}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item
                  key={sub.name}
                  onClick={() => navigate(`/collection/${sub.name}`)}
                >
                  {sub.name}
                </Menu.Item>
              )}
            </SubMenu>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default CategoryMenu;
