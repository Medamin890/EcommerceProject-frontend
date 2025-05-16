import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../pages/context/ShopContext';
import Item from '../Product/Items.jsx';
import { Carousel, Button } from 'antd';
import { CaretRightOutlined,CaretLeftOutlined } from '@ant-design/icons';
import { MdKeyboardArrowDown } from "react-icons/md";
import Title from './Title';
import {  TbArrowBigRightFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const NewArrivals = ({toggleModal}) => {
  const { all_products } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);
  const [visibilitySection, setvisibilitySection] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track active index of currently carousel item
  const navigate=useNavigate();
  // Toggle visibility function
  const toggleSection = () => {
    setvisibilitySection(!visibilitySection);
  };
  // Fetch the first 10 products from the list and update state
  useEffect(() => {
    const data = all_products.slice(-8);
    setNewArrivals(data);
  }, [all_products]);

  return (
    <section className="p-16 mt-40 space-y-12">
      {/* Title */}
      <Title title="New Arrivals" titleStyles="text-center" />
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              {/* title  */}
              <h2 className="text-xl font-bold">New Arrivals</h2>
              {/* buttons  */}
              <div className='flex gap-x-4'>
                <Button
                  onClick={() => navigate(`/collection`)}
                  variant='outlined'
                  color='primary'
                  className='hover:!bg-blue-400 hover:!text-white'
                  icon={<TbArrowBigRightFilled />}
                  >
                  <div  className='sm:block hidden'>See More</div>
                </Button>
                <Button
                    onClick={() => toggleSection()}
                    icon={
                      <MdKeyboardArrowDown
                        className={`text-2xl transform transition-transform duration-300 ${
                          visibilitySection ? 'rotate-0' : 'rotate-180'
                        }`}
                      />
                    }
                  >
                  <div className='sm:block hidden'> {visibilitySection ? 'Hide' : 'Show'}</div>
                </Button>
              </div>
            </div>
            {visibilitySection && (
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
                {newArrivals.map((product) => (
                    <div key={product._id} className="py-8  px-4 ">
                    <Item product={product} toggleModal={toggleModal} />
                    </div>
                          ))}
                </Carousel>
            )}
          </div>
    </section>
  );
};

export default NewArrivals;
