import React, { useContext, useState } from 'react';
import { Carousel, Button } from 'antd';
import { CaretRightOutlined,CaretLeftOutlined } from '@ant-design/icons';
import { MdKeyboardArrowDown } from "react-icons/md";
import Title from './Title';
import { ShopContext } from '../../pages/context/ShopContext';
import Item from '../Product/Items';
import {  TbArrowBigRightFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const PopularProducts = ({toggleModal}) => {
  const { all_products } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0); // Track active index of currently carousel item
  const navigate=useNavigate();
  // Define popular product subcategories
  const popularSubCategories = [
    { title: 'Popular Phones', category: 'Phones & Tablets', subCategory: 'Phone' },
    { title: 'Popular PC Gamer', category: 'Computer', subCategory: 'Pc Gamer' },
    { title: 'Popular Perfumes', category: 'Cosmetics', subCategory: 'Perfume' },
  ];

  // State for toggle visibility
  const [visibleSections, setVisibleSections] = useState(
    popularSubCategories.reduce((acc, section) => {
      acc[section.title] = true;
      return acc;
    }, {})
  );

  // Toggle visibility function
  const toggleSection = (title) => {
    setVisibleSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="p-16 space-y-12">
      {/* Title */}
      <Title title="Popular Products" titleStyles="text-center mb-8 " />

      {/* Dynamic Rendering */}
      {popularSubCategories.map(({ title, category, subCategory }) => {
        const filteredProducts = Array.isArray(category)
          ? all_products.filter(
              (product) =>
                category.includes(product.category) &&
                (!subCategory || product.subCategory === subCategory) &&
                product.popular
            )
          : all_products.filter(
              (product) =>
                product.category === category &&
                (!subCategory || product.subCategory === subCategory) &&
                product.popular
            );

        return (
          <div key={title} className="space-y-4">
            <div className="flex justify-between items-center px-4">
              {/* title  */}
              <h2 className="text-xl font-bold">{title}</h2>
              {/* buttons  */}
              <div className='flex gap-x-4'>
                <Button
                  onClick={() => navigate(`/collection/${category}/${subCategory}`)}
                  variant='outlined'
                  color='primary'
                  className='hover:!bg-blue-400 hover:!text-white'
                  icon={<TbArrowBigRightFilled />}
                  >
                  <div  className='sm:block hidden'>See More</div>
                </Button>
                <Button
                    onClick={() => toggleSection(title)}
                    icon={
                      <MdKeyboardArrowDown
                        className={`text-2xl transform transition-transform duration-300 ${
                          visibleSections[title] ? 'rotate-0' : 'rotate-180'
                        }`}
                      />
                    }
                  >
                  <div className='sm:block hidden'> {visibleSections[title] ? 'Hide' : 'Show'}</div>
                </Button>
              </div>
            </div>
            {visibleSections[title] && (
                <Carousel
                  className='flex'
                  arrows
                  infinite={false}
                  slidesToShow={ 4}
                  slidesToScroll={1}
                  dots
                  afterChange={(index) => setCurrentIndex(index)} // Track active index
                  customPaging={(i) => (
                    <div className="w-4 h-4 flex items-center justify-center mx-1">
                      <div
                        className={`
                          rounded-full w-3 h-3 cursor-pointer 
                          ${currentIndex === i ? 'bg-blue-800 scale-110 ' : 'bg-blue-300'}
                          hover:bg-blue-500 hover:scale-125 transform duration-200
                        `}
                      ></div>
                    </div>
                  )}
                  nextArrow={
                    <Button>
                       <CaretRightOutlined className='text-blue-500 text-6xl -mt-[30.5px] absolute z-50  -ml-[26px] ' />
                       </Button>
                  }
                  prevArrow={
                    <Button > 
                      <CaretLeftOutlined className='text-blue-500 text-6xl -mt-[30.5px]   absolute z-50  -ml-8 ' />
                      </Button>
                  }
                  draggable
                  responsive={[
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 3,
                      },
                    },
                    {
                      breakpoint: 800,
                      settings: {
                        slidesToShow: 2,
                      },
                    }, {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      },
                    },
                  ]}
                  
                >     
                 {filteredProducts.map((product) => (
                  <div key={product._id} className="py-8  px-4">
                    <Item product={product} toggleModal={toggleModal} />
                  </div>
                  ))}
                </Carousel>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PopularProducts;
