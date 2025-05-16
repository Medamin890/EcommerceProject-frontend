import { Button, Menu, Select, Slider } from "antd";
import {  useState } from "react";
import { MdKeyboardArrowDown, MdSort } from "react-icons/md";
import ShowSearch from "./ShowSearch";
import { useNavigate } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";

const categories = [
  {
    id: "cat-1",
    name: "Computer",
    subCategories: [
      {
        id: "cp-1",
        name: "Pc Normal & Pro",
        subSubCategories: [
          {
            id: "cp-1-1",
            name: "Desktop Pc",
            items: {
              OperatingSystem: ["FreeDos", "Windows 11", "Windows 10", "linux", "Ubuntu"],
              Processor: [
                "AMD Ryzen 3",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
                "AMD Ryzen 9",
                "Apple M1",
                "Apple M2",
                "Apple M3 Pro",
                "Celeron Intel",
                "Intel Core i3",
                "Intel Core i5",
                "Intel Core i7",
                "Intel Core i9",
                "Intel Core Ultra 5",
                "Intel Core Ultra 7",
              ],
              GraphicsCard: ["AMD Radeon", "GeForce Nvidia", "Intel UHD Graphics", "Integrated Graphic"],
              RefGraphicsCard: [
                "AMD Radeon 660M Graphics",
                "AMD Radeon Graphics",
                "AMD Radeon integrated",
                "Intel Arc Graphics (Intel AI Boost NPU)",
                "Intel GMA Integrated",
                "Intel Graphics",
                "Intel HD Graphics",
                "Intel Iris Xe",
                "Intel Iris Xe Graphics",
                "Intel UHD Graphics",
                "Nvidia Geforce MX330, 2 GB Dedicated Memory",
                "NVIDIA GeForce MX550, 2 GB dedicated GDDR6 memory",
                "NVIDIA GeForce MX570, 2 GB DDR6 dedicated",
              ],
              SizeScreen: ["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
              HardDisk: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
              Memoir: ["3G", "4G", "6G", "8G", "12G", "16G", "32G", "48G", "64G"],
              RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz", "160Hz", "240Hz", "360Hz", "540Hz"],
              TouchScreen: ["yes", "no"],
              CurvedScreen: ["yes", "no"],
            },
          },
          {
            id: "cp-1-2",
            name: "Portable Pc",
            items: {
              OperatingSystem: ["FreeDos", "Windows 11", "Windows 10", "linux", "Ubuntu"],
              Processor: [
                "AMD Ryzen 3",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
                "AMD Ryzen 9",
                "Apple M1",
                "Apple M2",
                "Apple M3 Pro",
                "Celeron Intel",
                "Intel Core i3",
                "Intel Core i5",
                "Intel Core i7",
                "Intel Core i9",
                "Intel Core Ultra 5",
                "Intel Core Ultra 7",
              ],
              GraphicsCard: ["AMD Radeon", "GeForce Nvidia", "Intel UHD Graphics", "Integrated Graphic"],
              RefGraphicsCard: [
                "AMD Radeon 660M Graphics",
                "AMD Radeon Graphics",
                "AMD Radeon integrated",
                "Intel Arc Graphics (Intel AI Boost NPU)",
                "Intel GMA Integrated",
                "Intel Graphics",
                "Intel HD Graphics",
                "Intel Iris Xe",
                "Intel Iris Xe Graphics",
                "Intel UHD Graphics",
                "Nvidia Geforce MX330, 2 GB Dedicated Memory",
                "NVIDIA GeForce MX550, 2 GB dedicated GDDR6 memory",
                "NVIDIA GeForce MX570, 2 GB DDR6 dedicated",
              ],
              SizeScreen: ["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
              HardDisk: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
              Memoir: ["3G", "4G", "6G", "8G", "12G", "16G", "32G", "48G", "64G"],
              RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz", "160Hz", "240Hz", "360Hz", "540Hz"],
              TouchScreen: ["yes", "no"],
              CurvedScreen: ["yes", "no"],
            },
          },
          {
            id: "cp-1-3",
            name: "Mac Book Pc",
            items: {
              OperatingSystem: ["MacOS Monterey", "macOS Big Sur"],
              Processor: ["Apple M1", "Apple M2", "Apple M3 Pro"],
              RefGraphicsCard: ["Apple M1", "Apple M2", "Apple M3 Pro"],
              SizeScreen: ["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
              HardDisk: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
              Memoir: ["3G", "4G", "6G", "8G", "12G", "16G", "32G", "48G", "64G"],
              RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz", "160Hz", "240Hz", "360Hz", "540Hz"],
              TouchScreen: ["yes", "no"],
            },
          },
        ],
      },
      {
        id: "cp-2",
        name: "Pc Gamer",
        subSubCategories: [
          {
            id: "cp-2-1",
            name: "Desktop Gamer Pc",
            items: {
              OperatingSystem: ["FreeDos", "Windows 11", "Windows 10"],
              Processor: [
                "AMD Ryzen 3",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
                "AMD Ryzen 9",
                "Intel Core i3",
                "Intel Core i5",
                "Intel Core i7",
                "Intel Core i9",
              ],
              GraphicsCard: ["AMD Radeon", "GeForce Nvidia"],
              RefGraphicsCard: [
                "AMD Radeon 660M Graphics",
                "AMD Radeon Graphics",
                "AMD Radeon integrated",
                "AMD Radeon RX 7600S, 8 GB dedicated GDDR6 memory",
                "Nvidia Geforce MX330, 2 GB Dedicated Memory",
                "NVIDIA GeForce MX550, 2 GB dedicated GDDR6 memory",
                "NVIDIA GeForce MX570, 2 GB DDR6 dedicated",
                "Nvidia GeForce RTX 2050, 4 GB dedicated GDDR6 memory",
                "Nvidia GeForce RTX 3050, 4 GB of dedicated memory",
                "Nvidia GeForce RTX 4060, 8 GB of dedicated memory",
                "NVIDIA GeForce RTX 4090, 16 GB of dedicated memory",
                "NVIDIA T600 4 GB, 4 GB dedicated GDDR6 memory",
              ],
              SizeScreen: ["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
              HardDisk: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
              Memoir: ["3G", "4G", "6G", "8G", "12G", "16G", "32G", "48G", "64G"],
              RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz", "160Hz", "240Hz", "360Hz", "540Hz"],
              TouchScreen: ["yes", "no"],
              CurvedScreen: ["yes", "no"],
            },
          },
          {
            id: "cp-2-2",
            name: "Portable Gamer Pc",
            items: {
              OperatingSystem: ["FreeDos", "Windows 11", "Windows 10"],
              Processor: [
                "AMD Ryzen 3",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
                "AMD Ryzen 9",
                "Intel Core i3",
                "Intel Core i5",
                "Intel Core i7",
                "Intel Core i9",
              ],
              GraphicsCard: ["AMD Radeon", "GeForce Nvidia"],
              RefGraphicsCard: [
                "AMD Radeon 660M Graphics",
                "AMD Radeon Graphics",
                "AMD Radeon integrated",
                "AMD Radeon RX 7600S, 8 GB dedicated GDDR6 memory",
                "Nvidia Geforce MX330, 2 GB Dedicated Memory",
                "NVIDIA GeForce MX550, 2 GB dedicated GDDR6 memory",
                "NVIDIA GeForce MX570, 2 GB DDR6 dedicated",
                "Nvidia GeForce RTX 2050, 4 GB dedicated GDDR6 memory",
                "Nvidia GeForce RTX 3050, 4 GB of dedicated memory",
                "Nvidia GeForce RTX 4060, 8 GB of dedicated memory",
                "NVIDIA GeForce RTX 4090, 16 GB of dedicated memory",
                "NVIDIA T600 4 GB, 4 GB dedicated GDDR6 memory",
              ],
              SizeScreen: ["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
              HardDisk: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
              Memoir: ["3G", "4G", "6G", "8G", "12G", "16G", "32G", "48G", "64G"],
              RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz", "160Hz", "240Hz", "360Hz", "540Hz"],
              TouchScreen: ["yes", "no"],
            },
          },
        ],
      },
      {
        id: "cp-3",
        name: "Pc Accessories",
        subSubCategories: [
          {
            id: "cp-3-1",
            name: "Charger",
            items: {},
          },
          {
            id: "cp-3-2",
            name: "Keyboard",
            items: {
              Type: ["mechanics", "semi-mecanique", "not mecanique"],
              Connectivity: ["Usb Cable", "Wireless"],
              Gamer: ["yes", "no"],
            },
          },
          {
            id: "cp-3-3",
            name: "Mouse",
            items: {
              Connectivity: ["Usb Cable", "Wireless"],
              Gamer: ["yes", "no"],
            },
          },
          {
            id: "cp-3-4",
            name: "Headphones Pc",
            items: {
              Connectivity: ["Usb Cable", "Wireless"],
              Gamer: ["yes", "no"],
            },
          },
        ],
      },
    ],
  },
  {
    id: "cat-2",
    name: "Phones & Tablets",
    subCategories: [
      {
        id: "pt-1",
        name: "Phone",
        subSubCategories: [],
        items: {
          DoubleSIM: ["yes", "no"],
          Network: ["6G", "5G", "4G", "3G"],
          Memoir: ["3G", "4G", "6G", "8G", "12G"],
          Storage: ["32G", "64G", "128G", "256G", "512G"],
          ProcessorType: ["Apple", "Déca Core", "MediaTek", "Octa Core", "Quad Core", "snapdragon"],
          RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz"],
          System: ["Android", "iOS"],
        },
      },
      {
        id: "pt-2",
        name: "Tablet",
        subSubCategories: [],
        items: {
          DoubleSIM: ["yes", "no"],
          Network: ["6G", "5G", "4G", "3G"],
          Memoir: ["3G", "4G", "6G", "8G", "12G"],
          Storage: ["32G", "64G", "128G", "256G", "512G"],
          ProcessorType: ["Apple", "Déca Core", "MediaTek", "Octa Core", "Quad Core", "snapdragon"],
          RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz"],
          System: ["Android", "iOS"],
        },
      },
      {
        id: "pt-3",
        name: "Phones Accessories",
        subSubCategories: [
          {
            id: "pt-3-1",
            name: "Ecouter",
            items: {
              Connectivity: ["Usb Cable", "Wireless"],
            },
          },
          {
            id: "pt-3-2",
            name: "Charger",
            items: {
              TypeCable: ["USB type c", "USB type Micro B", "Wireless"],
              fastCharger: ["yes", "no"],
              speedCharger: ["15W", "20W", "25W", "30W", "40W", "50W", "60W", "65W", "70W", "80W", "90W", "100W"],
            },
          },
          {
            id: "pt-3-3",
            name: "Powerbank",
            items: {
              TypeCable: ["USB type c", "USB type Micro B"],
              Capacity: ["5000mAh", "10000mAh", "15000mAh", "20000mAh", "25000mAh"],
              fastpowerbank: ["yes", "no"],
              FastCharger: ["15W", "18W", "20W", "25W", "30W", "45W", "65W"],
            },
          },
        ],
      },
    ],
  },
  {
    id: "cat-3",
    name: "Household Appliances",
    subCategories: [
      {
        id: "H-1",
        name: "washing machine",
        subSubCategories: [],
        items: {
          WipingSpeed: ["1400 R/min", "1200 R/min", "1000 R/min", "700 R/min", "800 R/min"],
          NumberOfPrograms: [5, 6, 7, 7.5, 8, 9, 10, 10.5, 12, 14, 15, 16, 17, 18, 19],
          Type: ["Cap", "Frontal"],
          CapacityOfWashing: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          SteamFunction: ["yes", "no"],
          Displayer: ["yes", "no"],
          Invert: ["yes", "no"],
        },
      },
      {
        id: "H-2",
        name: "Refrigerator",
        subSubCategories: [],
        items: {
          Type: ["Combined", "Double-doors", "Embeddable", "Side By Side", "A Door"],
          CoolingSystem: ["DeFrost", "Less Frost", "NoFrost"],
          Volume: [
            "Between 0 and 200 liters",
            "Between 201 and 300 litres",
            "Between 301 and 400 litres",
            "Between 401 and 500 litres",
            "Between 501 and 600 litres",
            "Between 601 litres and more",
          ],
          Invert: ["yes", "no"],
        },
      },
      {
        id: "H-3",
        name: "Air Conditioner",
        subSubCategories: [],
        items: {
          Type: ["Hot cold", "Cold"],
          Power: ["9000 BTU", "12000 BTU", "18000 BTU", "24000 BTU", "30000 BTU", "36000 BTU", "48000 BTU", "54000 BTU", "60000 BTU"],
          Inverter: ["yes", "no"],
        },
      },
      {
        id: "H-4",
        name: "TV",
        subSubCategories: [],
        items: {
          ScreenType: ["HD", "FHD", "4K UHD", "8K UHD"],
          TouchScreen: ["yes", "no"],
          Wifi: ["yes", "no"],
          SmartTV: ["yes", "no"],
          IntegratedReceiver: ["yes", "no"],
          CurvedScreen: ["yes", "no"],
          RefreshRate: ["60Hz", "90Hz", "120Hz", "144Hz", "240Hz"],
        },
      },
    ],
  },
  {
    id: "cat-4",
    name: "Cosmetics",
    subCategories: [
      {
        id: "C-1",
        name: "Perfume",
        subSubCategories: [],
        items: {
          TypeUser: ["women", "man", "kid", "both"],
          Volume: ["25ml", "50ml", "75ml", "100ml", "150ml", "200ml"],
        },
      },
      {
        id: "C-2",
        name: "Care",
        subSubCategories: [],
        items: {
          AgeRange: ["adult", "young", "kid"],
          Volume: ["25ml", "50ml", "75ml", "100ml", "150ml", "200ml", "250ml", "300ml", "400ml", "500ml"],
        },
      },
    ],
  },
];
const LeftFilterBar = ({ 
  category,
  subCategory,
  subSubCategory, 
  onFilterChange,
  setPriceRange,
  priceRange,
  maxPrice,
  colors,
  warranties,
  brands 
}) => {

  // Navigate to the selected sub-subcategory
  const navigate = useNavigate(); 
  function findSelectedSubCategoryObject(categories, selectedCategory, selectedSubcategory) {
    // Loop through categories
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === selectedCategory) {
        // Loop through subCategories
        for (let j = 0; j < categories[i].subCategories.length; j++) {
          if (categories[i].subCategories[j].name === selectedSubcategory) {
            return categories[i].subCategories[j];
          }
        }
      }
    }
    // Return null if not found
    return null;
  }

  // Find the selected sub-category object safely
  const selectedSubCategory = findSelectedSubCategoryObject(categories, category, subCategory)|| {};

  // Find the selected sub-subcategory or fallback to subCategory
  let selectedattributsItems = subSubCategory
    ? selectedSubCategory?.subSubCategories?.find(subSub => subSub.name === subSubCategory)
    : selectedSubCategory;

  // Get the filter attributes from the sub-subcategory or fallback to an empty object
  const items = selectedattributsItems?.items || {};

  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState({});

  // Handle checkbox changes
  const handleCheckboxChange = (attribute, value) => {
    setSelectedFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[attribute]) {
        updatedFilters[attribute] = [];
      }

      if (updatedFilters[attribute].includes(value)) {
        // Remove value if already selected
        updatedFilters[attribute] = updatedFilters[attribute].filter(item => item !== value);

        // Remove attribute if empty
        if (updatedFilters[attribute].length === 0) {
          delete updatedFilters[attribute];
        }
      } else {
        // Add value if not already selected
        updatedFilters[attribute] = [...updatedFilters[attribute], value];
      }
      console.log("updatedFilters", updatedFilters);
      // Notify parent component (if needed)
      onFilterChange && onFilterChange(updatedFilters);

      return updatedFilters;
    });
  };
  // for visibility of items of Filters bar: Brands,, Colors, Warranty
  const updatedItems = {
    "subSubCategory": true,
    "Price Range": true,
    "Brands": brands,
    "color": colors,
    "waranty": warranties,
    ...items, // Spread the original items (this keeps existing values)
  };
  const [visibleItems, setVisibleItems] = useState(() =>
    Object.keys(updatedItems).reduce((acc, attribute) => {
      acc[attribute] = true; // Default all attributes to visible
      return acc;
    }, {})
  );
  // Toggle visibility function
  const toggleItem = (attribute) => {
    setVisibleItems((prev) => ({
      ...prev,
      [attribute]: !prev[attribute],
    }));
  };
  
  
  return (
    <div className=" pt-8  pl-4 px-2 border  rounded-2xl bg-white text-black shadow-md ">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>
      {/* 🔍 Search Box */}
      <ShowSearch />
      {/* 📦   if subsubcategory not selected and these subcategory has subsubcategory */}
      {category && subCategory && !subSubCategory &&  selectedSubCategory?.subSubCategories.length !== 0  &&  (
        <div key={"subSubCategory"} className="gap-x-5 my-4">
            <div className="flex flex-row justify-between items-center w-64 px-2">
            <h2 className="text-xl font-bold">Select Sub Categry</h2>
              <Button
                  onClick={() => toggleItem("subSubCategory")}
                  className="border-none -mt-2"
                  icon={
                      <MdKeyboardArrowDown
                      className={`text-2xl transform transition-transform duration-300 ${
                          visibleItems["subSubCategory"] ? 'rotate-0' : 'rotate-180'
                        }`  
                        }
                        />
                    }
                >
                  {visibleItems["subSubCategory"] ? '' : ''}
                </Button>
            </div>
          {visibleItems["subSubCategory"] &&
             <div className="flex flex-col mt-2 gap-y-3 animate-slideDown">
              {selectedSubCategory.subSubCategories.map(subSub => (
                      <button
                        key={subSub.id}
                        variant="link"
                        className="w-full flex border-none gap-2  underline px-4 text-start  text-blue-700 hover:text-blue-700/50 animation-btn "
                        onClick={() => navigate(`/collection/${category}/${subCategory}/${subSub.name}`)}
                        >
                       <TbArrowRight/> {subSub.name}
                      </button>
                    ))}
                    </div>
            }
            <hr className="my-2 border-gray-200" />
        </div>
      )}
      {/* 💲 Price Range Filter */}
      <div key={"Price Range"} className="gap-x-5 my-4">
            <div className="flex flex-row justify-between items-center w-64 px-2">
            <h2 className="text-xl font-bold">Price Range</h2>
              <Button

                  onClick={() => toggleItem("Price Range")}
                  className="border-none -mt-2"
                  icon={
                      <MdKeyboardArrowDown
                      className={`text-2xl transform transition-transform duration-300 ${
                          visibleItems["Price Range"] ? 'rotate-0' : 'rotate-180'
                        }`}
                        />
                    }
                >
                  {visibleItems["Price Range"] ? '' : ''}
                </Button>
            </div>
          {visibleItems["Price Range"] && 
                <div className=" mt-2 px-4 animate-slideDown">
                        <Slider
                        range={{
                            draggableTrack: true,
                        }}
                        min={0}
                        max={maxPrice}
                        value={[priceRange.min, priceRange.max]}
                        onChange={(value) => setPriceRange({ min: value[0], max: value[1] })}
                        />
                        <div className="flex justify-between text-sm mt-2">
                        <span>Min: ${priceRange.min}</span>
                        <span>Max: ${priceRange.max}</span>
                        </div>
                  </div>
            }
            <hr className="my-2 border-gray-200" />
      </div>
      {category && subCategory && (
      <div>
          {/*🏷️ Filter by brands*/}
          <div key={"Brands"} className="gap-x-5 my-4">
                <div className="flex flex-row justify-between items-center w-64 px-2">
                <h2 className="text-xl font-bold">Brands</h2>
                  <Button
                  
                      onClick={() => toggleItem("Brands")}
                      className="border-none -mt-2"
                      icon={
                          <MdKeyboardArrowDown
                          className={`text-2xl transform transition-transform duration-300 ${
                              visibleItems["Brands"] ? 'rotate-0' : 'rotate-180'
                            }`}
                            />
                        }
                    >
                      {visibleItems["Brands"] ? '' : ''}
                    </Button>
                </div>
              {visibleItems["Brands"] &&
                    <div className="flex flex-col space-y-1 mt-2 px-4 animate-slideDown">
                        {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            checked={selectedFilters["Brands"]?.includes(brand) || false}
                            onChange={() => handleCheckboxChange("Brands", brand)}
                            className="cursor-pointer"
                            />
                            <span>{brand}</span>
                        </label>
                        ))}
                    </div>
                }
                <hr className="my-2 border-gray-200" />
          </div>
          {/* 📦  Filters product attributs  */}
          {Object.entries(items).map(([attribute, values], index) => (
          <div key={`${attribute}-${index}`} className="gap-x-5 my-4">
            <div className="flex flex-row justify-between items-center w-64 px-2">
              <h2 className="text-xl font-bold">{attribute}</h2>
              <Button
                onClick={() => toggleItem(attribute)}
                className="border-none -mt-2"
                icon={
                  <MdKeyboardArrowDown
                    className={`text-2xl transform transition-transform duration-300 ${
                      visibleItems[attribute] ? 'rotate-0' : 'rotate-180'
                    }`}
                  />
                }
              />
            </div>

            {visibleItems[attribute] && (
              <div className="flex flex-col space-y-1 mt-2 px-4 animate-slideDown">
                {values.map((value, valueIndex) => (
                  <div key={`${attribute}-${value}-${valueIndex}`} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters[attribute]?.includes(value) || false}
                      onChange={() => handleCheckboxChange(attribute, value)}
                      className="cursor-pointer"
                    />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
            <hr className="my-2 border-gray-200" />
          </div>
          ))}
      </div>
      )}

      {/* 🎨  Filter by colors */}
      <div key={"color"} className="gap-x-5 my-4">
          <div className="flex flex-row justify-between items-center w-64 px-2">
          <h2 className="text-xl font-bold">Colors</h2>
            <Button
                  
                onClick={() => toggleItem("color")}
                className="border-none -mt-2"
                icon={
                    <MdKeyboardArrowDown
                    className={`text-2xl transform transition-transform duration-300 ${
                        visibleItems["color"] ? 'rotate-0' : 'rotate-180'
                      }`}
                      />
                  }
              >
                {visibleItems["color"] ? '' : ''}
              </Button>
          </div>
        {visibleItems["color"] &&
              <div className="flex flex-col space-y-1 mt-2 px-4 animate-slideDown">
                  {colors.map(color => (
                  <label key={color} className="flex items-center space-x-2">
                      <input
                      type="checkbox"
                      checked={selectedFilters["color"]?.includes(color) || false}
                      onChange={() => handleCheckboxChange("color", color)}
                      className="cursor-pointer"
                      />
                      <span>{color}</span>
                  </label>
                  ))}
              </div>
          }
          <hr className="my-2 border-gray-200" />
      </div>
      {/*  Filter by Warranty  */}
      <div key={"waranty"} className="gap-x-5 my-4">
            <div className="flex flex-row justify-between items-center w-64 px-2">
            <h2 className="text-xl font-bold">Warranty</h2>
              <Button

                  onClick={() => toggleItem("waranty")}
                  className="border-none -mt-2"
                  icon={
                      <MdKeyboardArrowDown
                      className={`text-2xl transform transition-transform duration-300 ${
                          visibleItems["waranty"] ? 'rotate-0' : 'rotate-180'
                        }`} 
                        />    
                    }
                >
                  {visibleItems["waranty"] ? '' : ''}
                </Button>
            </div>
          {visibleItems["waranty"] &&
                <div className="flex flex-col space-y-1 mt-2 px-4 animate-slideDown">
                    {warranties.map(warranty => (
                    <label key={warranty} className="flex items-center space-x-2">
                        <input
                        type="checkbox"
                        checked={selectedFilters["waranty"]?.includes(warranty) || false}
                        onChange={() => handleCheckboxChange("waranty", warranty)}
                        className="cursor-pointer"
                        />
                        <span>{warranty}</span>
                    </label>
                    ))}
                </div>
            }
            <hr className="my-2 border-gray-200" />
      </div>

    </div>
  );
};

export default LeftFilterBar;
