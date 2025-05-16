import React from 'react'
import ShowSearch from './ShowSearch'
import Item from '../Product/Items';

const lside = ({subSubCategory,subCategory,category,setSortType, setPriceRange, priceRange, maxPrice}) => {
    const categories = [
        {
          name: "Computer",
          subCategories: [
            {
              name: "Pc",
              subSubCategories: [
                { 
                    name: "Desktop Pc",
                    items:{
                        OperatingSystem:["FreeDos", "Windows 11", "Windows 10","linux","Ubuntu"],
                        Processor:[
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
                        GraphicsCard:[
                            "AMD Radeon",
                            "GeForce Nvidia",
                            "Intel UHD Graphics",
                            "Integrated Graphic"
                            ],
                        RefGraphicsCard:[
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
                        SizeScreen:["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
                        HardDisk:["256 GB SSD", "512 GB SSD","1 TB SSD", "2 TB SSD"],
                        Memoir:["3G", "4G", "6G", "8G", "12G","16G","32G","48G","64G"],
                        RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz","160Hz","240Hz","360Hz","540Hz"],
                        TouchScreen:["yes", "no"],
                        CurvedScreen:["yes", "no"],
                    }
                },
                { 
                    name: "Portable Pc",
                    items:{
                        OperatingSystem:["FreeDos", "Windows 11", "Windows 10","linux","Ubuntu"],
                        Processor:[
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
                        GraphicsCard:[
                            "AMD Radeon",
                            "GeForce Nvidia",
                            "Intel UHD Graphics",
                            "Integrated Graphic"
                            ],
                        RefGraphicsCard:[
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
                        SizeScreen:["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
                        HardDisk:["256 GB SSD", "512 GB SSD","1 TB SSD", "2 TB SSD"],
                        Memoir:["3G", "4G", "6G", "8G", "12G","16G","32G","48G","64G"],
                        RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz","160Hz","240Hz","360Hz","540Hz"],
                        TouchScreen:["yes", "no"],
                        CurvedScreen:["yes", "no"],
                    }
                },
                { 
                    name: "Mac book pc",
                    items:{
                        OperatingSystem:["MacOS Monterey","macOS Big Sur"],
                        Processor:[
                            "Apple M1",
                            "Apple M2",
                            "Apple M3 Pro",
                        ],
                        RefGraphicsCard:[
                            "Apple M1",
                            "Apple M2",
                            "Apple M3 Pro",
                        ],
                        SizeScreen:["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
                        HardDisk:["256 GB SSD", "512 GB SSD","1 TB SSD", "2 TB SSD"],
                        Memoir:["3G", "4G", "6G", "8G", "12G","16G","32G","48G","64G"],
                        RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz","160Hz","240Hz","360Hz","540Hz"],
                        TouchScreen:["yes", "no"],
                    }
                }
             ],
            },
            {
              name: "Pc Gamer",
              subSubCategories: [
                {
                    name :"Desktop Gamer Pc",
                    items:{
                        OperatingSystem:["FreeDos", "Windows 11", "Windows 10"],
                        Processor:[
                            "AMD Ryzen 3",
                            "AMD Ryzen 5",
                            "AMD Ryzen 7",
                            "AMD Ryzen 9",
                            "Intel Core i3",
                            "Intel Core i5",
                            "Intel Core i7",
                            "Intel Core i9",
                          ],
                        GraphicsCard:[
                            "AMD Radeon",
                            "GeForce Nvidia",
                            ],
                        RefGraphicsCard:[
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
                        SizeScreen:["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
                        HardDisk:["256 GB SSD", "512 GB SSD","1 TB SSD", "2 TB SSD"],
                        Memoir:["3G", "4G", "6G", "8G", "12G","16G","32G","48G","64G"],
                        RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz","160Hz","240Hz","360Hz","540Hz"],
                        TouchScreen:["yes", "no"],
                        CurvedScreen:["yes", "no"],
                    }
                    
                },
                {
                    name :"Portable Gamer Pc",
                    items:{
                        OperatingSystem:["FreeDos", "Windows 11", "Windows 10"],
                        Processor:[
                            "AMD Ryzen 3",
                            "AMD Ryzen 5",
                            "AMD Ryzen 7",
                            "AMD Ryzen 9",
                            "Intel Core i3",
                            "Intel Core i5",
                            "Intel Core i7",
                            "Intel Core i9",
                          ],
                        GraphicsCard:[
                            "AMD Radeon",
                            "GeForce Nvidia",
                            ],
                        RefGraphicsCard:[
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
                        SizeScreen:["13.6°", "13.3°", "14°", "15.6°", "16°", "17.3°", "27°"],
                        HardDisk:["256 GB SSD", "512 GB SSD","1 TB SSD", "2 TB SSD"],
                        Memoir:["3G", "4G", "6G", "8G", "12G","16G","32G","48G","64G"],
                        RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz","160Hz","240Hz","360Hz","540Hz"],
                        TouchScreen:["yes", "no"],
                    }
                }
            ]
            },
            {
              name: "Pc Accessories",
              subSubCategories: [
                { 
                    name: "Charger",
                    items:{}
                },
                {
                    name: "Keyboard",
                    items:{
                        Type:["mechanics","semi-mecanique","not mecanique"],
                        Connectivity:["Usb Cable", "Wireless"],
                        Gamer:["yes", "no"],
                        
                    }
                },
                {
                    name: "Mouse",
                    items:{
                        Connectivity:["Usb Cable", "Wireless"],
                        Gamer:["yes", "no"],
                        
                    }
                },
                {
                    name: "Headphones Pc" ,
                    items:{
                        Connectivity:["Usb Cable", "Wireless"],
                        Gamer:["yes", "no"],
                        
                    }
           }],
            },
          ],
        },
        {
          name: "Phones & Tablets",
          subCategories: [
            { name: "Phone",
              subSubCategories: [],
              items:{
                DoubleSIM:["yes", "no"],
                Network:["6G", "5G", "4G", "3G"],
                Memoir:["3G", "4G", "6G", "8G", "12G"],
                Storage:["32G", "64G", "128G", "256G", "512G"],
                ProcessorType:["Apple", "Déca Core", "MediaTek", "Octa Core", "Quad Core", "snapdragon"],
                RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz"],
                System:["Android", "iOS"]
            }
            },
            { name: "Tablet",
                 subSubCategories: [],
                 items:{
                    DoubleSIM:["yes", "no"],
                    Network:["6G", "5G", "4G", "3G"],
                    Memoir:["3G", "4G", "6G", "8G", "12G"],
                    Storage:["32G", "64G", "128G", "256G", "512G"],
                    ProcessorType:["Apple", "Déca Core", "MediaTek", "Octa Core", "Quad Core", "snapdragon"],
                    RefreshRate:["60Hz", "90Hz", "120Hz", "144Hz"],
                    System:["Android", "iOS"]
                 }
            },
            {
              name: "Phones Accessories",
              subSubCategories: [
                {
                    name: "ecouter",
                    items:{
                    Connectivity:["Usb Cable", "Wireless"]
                    }
                },{
                    name: "Charger",
                    items:{
                        TypeCable:["USB type c", "USB type Micro B", "Wireless"],   
                        fastCharger:["yes", "no"],
                        speedCharger:["15W", "20W", "25W", "30W", "40W", "50W", "60W", "65W", "70W", "80W", "90W", "100W"]
                    }
                },{
                    name: "Powerbank",
                    items:{
                        TypeCable:["USB type c", "USB type Micro B"],   
                        Capacity:["5000mAh", "10000mAh", "15000mAh", "20000mAh", "25000mAh"],
                        fastpowerbank:["yes", "no"],
                        FastCharger:["15W", "18W", "20W", "25W", "30W", "45W", "65W"]
                    }
                } 
                ],
            },
          ],
        },
        {
          name: "Household Appliances",
          subCategories: [
            { name: "Washing Machine",
              subSubCategories: [],
              items:{ 
                WipingSpeed:[ "1400 R/min","1200 R/min","1000 R/min", "1200 R/min", "1400 R/min", "700 R/min", "800 R/min"],
                NumberOfPrograms:[ 5, 6, 7, 7.5, 8, 9, 10, 10.5, 12, 14, 15, 16, 17, 18, 19 ],
                Type:["Cap", "Frontal"],
                CapacityOfWashing:[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                SteamFunction:["yes", "no"], 
                Displayer:["yes", "no"],
                Invert:["yes", "no"],
              }},
            { name: "Refrigerator",
              subSubCategories: [],
                items:{
                    Type:["Combined", "Double-doors", "Embeddable", "Side By Side", "A Door"],
                    CoolingSystem :["DeFrost", "Less Frost", "NoFrost"],
                    Volume:[
                        "Between 0 and 200 liters",
                        "Between 201 and 300 litres",
                        "Between 301 and 400 litres",
                        "Between 401 and 500 litres",
                        "Between 501 and 600 litres",
                        "Between 601 litres and more"
                      ],
                    Invert :["yes", "no"],
                }},
            { name: "Air Conditioner",
              subSubCategories: [],
              items:{
                Type :["Hot cold", "Cold"],
                Power:["9000 BTU", "12000 BTU", "18000 BTU", "24000 BTU", "30000 BTU", "36000 BTU", "48000 BTU", "54000 BTU", "60000 BTU"],
                Inverter :["yes", "no"],
                }},
            { name: "TV", 
              subSubCategories: [] ,
              items:{
                ScreenType :["HD", "FHD", "4K UHD", "8K UHD"], 
                TouchScreen  :["yes", "no"],
                Wifi  :["yes", "no"],
                SmartTV  :["yes", "no"],
                IntegratedReceiver :["yes", "no"],
                CurvedScreen :["yes", "no"],
                RefreshRate :["60Hz", "90Hz", "120Hz", "144Hz", "240Hz"]
                }},
          ],
        },
        {
          name: "Cosmetics",
          subCategories: [
            { name: "Perfume",
              subSubCategories: [] ,
              items:{
                    TypeUser :["women", "man", "kid", "both"],  
                    Volume  :["25ml", "50ml", "75ml", "100ml", "150ml", "200ml"]
            }},
            { name: "Care",  
              subSubCategories: [] ,
              items:{
                AgeRange :["adult", "young", "kid"],  
                Volume  :["25ml", "50ml", "75ml", "100ml", "150ml", "200ml", "250ml", "300ml", "400ml", "500ml"]
              }},
          ],
        },
      ];
  return (
    <section className="min-w-60 bg-white p-4 rounded-2xl pt-4 gap-y-4">
        
        {/* 🔍 Search Box */}
        <ShowSearch />
         {/* 📁 Categories Filter */}
        { subSubCategory && (
            <div />

        )}
   

        {/* 📁 Category Filter */}
        { categories.map((categ) => (
            categ.subCategories.map((subCateg) => (
                subCateg.subSubCategories.map((subSubCateg) => (
                    <div className="bg-primary ring-1 ring-slate-900/5 px-5 py-3 rounded-xl">
                    <label className="h5 mb-4 flex text-xl gap-2"> <IoFilter />{subSubCateg.name}</label>
                        {subSubCateg.items.map((items) => (
                            items.map((item) => (
                            <div className="bg-primary ring-1 ring-slate-900/5 px-5 py-3 rounded-xl">
                                <label className="h5 mb-4 flex text-xl gap-2"> <IoFilter />{subSubCateg.name}</label>
                                <input
                                type='checkbox'
                                name={item}
                                onChange={(e) => setsubsubcateg(e.target.value)}
                                value={selectedSubsubcateg}
                                className="w-full border h-9 border-gray-300 text-sm rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            ))
                        ))}
                        </div>
                ))
            ))
        ))
            
            

        }
        
        {/* if the we have category &  subcategory  in url  */}
        { !subSubCategory && subCategory &&(
            <>
              {category === "Computer" && (
                {subCategory}

              )
              }
            </>
           
        )}

        {/* 💲 Price Range Filter */}
        <div className="bg-primary ring-1 ring-slate-900/5 p-5 py-3 rounded-xl mt-4">
                <h5 className="h5 mb-4">Price Range</h5>
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

        {/* 🔄 Sort By Filter */}
        <div className="bg-primary ring-1 ring-slate-900/5 p-5 py-3 rounded-xl mt-4">
            <h5 className="h5 mb-4 flex gap-1"><MdSort />Sort By</h5>
            <select
            onChange={(e) => setSortType(e.target.value)}
            className="w-full border h-9 border-gray-300 text-sm rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low">Sort by: Low to High Price</option>
            <option value="high">Sort by: High to Low Price</option>
            </select>
        </div>
        </section>
  )
}

export default lside