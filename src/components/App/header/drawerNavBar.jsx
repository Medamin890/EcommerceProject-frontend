import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import { SiGooglehome, SiAtlassian, SiMaildotcom } from "react-icons/si";
import { BsCollectionFill } from "react-icons/bs";
import {  useNavigate } from "react-router-dom";

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

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]); // Control open menus

  const handleSubMenuClick = (key) => {
    setOpenKeys(openKeys.includes(key) ? openKeys.filter((k) => k !== key) : [...openKeys, key]);
  };
  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // Close drawer after navigating
    return false;
  };

  return (
    <Drawer title="Shoppire" className="!text-3xl" style={{color:'#43c2d1'}} placement="left"  onClose={onClose} open={open} >
      <Menu mode="inline" openKeys={openKeys} onOpenChange={setOpenKeys}>
        {/* Home */}
        <Menu.Item key="home" icon={<SiGooglehome />} onClick={() => handleNavigate("/")}>
          Home
        </Menu.Item>

    {/* Categories */}
    <Menu.SubMenu
            key="categories"
            icon={<BsCollectionFill />}
            title="Categories"
        >
        {categories.map((category) => (
          <Menu.SubMenu
            key={category.name}
            title={category.name}
            onTitleClick={() => handleSubMenuClick(category.name)}
          >
            {category.subCategories.map((sub) => (
              <Menu.SubMenu
                key={sub.name}
                title={sub.name}
                styles={{color:'blue'}}
                className="underline !px-0$ animation-btn"
                onTitleClick={() => navigate(`/collection/${category.name}/${sub.name}` )} // ✅ Now subcategories navigate!
              >
                {sub.subSubCategories.length > 0 ? (
                  sub.subSubCategories.map((item) => (
                    <Menu.Item
                      key={item}
                      className="underline !pl-[72.28px]"
                      onClick={() => navigate(`/collection/${category.name}/${sub.name}/${item}`)}
                    >
                      {item}
                    </Menu.Item>
                  ))
                ) : (
                  <Menu.Item
                    key={sub.name}
                    onClick={() => navigate(`/collection/${category.name}/${sub.name}`)}
                  >
                    {sub.name}
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu.SubMenu>
        {/* About */}
        <Menu.Item key="about" icon={<SiAtlassian />} onClick={() => handleNavigate("/about")}>
          About
        </Menu.Item>

        {/* Contact */}
        <Menu.Item key="contact" icon={<SiMaildotcom />} onClick={() => handleNavigate("/contact")}>
          Contact
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default Sidebar;
