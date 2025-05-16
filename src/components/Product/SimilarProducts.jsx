import React, { useContext, useState } from 'react';
import Item from './Items'; // Assuming Item is correctly set up for displaying a single product
import { ShopContext } from '../../pages/context/ShopContext';
import { Button, Carousel } from 'antd';
import 'antd/dist/reset.css';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

const SimilarProducts = ({ similarCategory, currentProductId }) => {
  const { all_products } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0); // Track active index of currently carousel item

  // Filter products based on the same subcategory and exclude the current product
  const similarProducts = all_products
    .filter((product) => product.subCategory === similarCategory && product._id !== currentProductId)
    .slice(0, 10); // Take only the first 10 products

  if (similarProducts.length === 0) {
    return <div>No similar products found.</div>;
  }

  return (
    <section className="mt-10   ">
      <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
      <Carousel
        className='flex '
        dots
        arrows
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
        infinite={false}
        slidesToShow={ 4}
        slidesToScroll={1}
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
                slidesToShow: 3,  slidesToScroll: 1,
            },
            },
            {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,  slidesToScroll: 1,
            },
            }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,  slidesToScroll: 1,
            },
            },
        ]}
        >     
        {similarProducts.map((product) => (
          <div key={product._id} className="py-8  px-4">
            <Item product={product} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default SimilarProducts;
