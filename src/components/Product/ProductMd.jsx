import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import ShareProduct from "./ShareProduct";
import { LuMoveUpRight } from "react-icons/lu";
import { FaStarHalfAlt } from "react-icons/fa";
import { Image, Tooltip } from "antd";
import FavoriteButton from "./favoriteBtn";
import { ShopContext } from "../../pages/context/ShopContext";

const ProductMd = ({ product , toggleModal}) => {
  const { addToCart,token ,all_products} = useContext(ShopContext);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    if (product) {
      setImage(product.images[0]); // Set the first image as default
    }
  };

  // Check if the product is one of the last 10 products
  const isLastTenProduct = (productId) => {
    const lastTenProducts = all_products.slice(-10); // Get the last 10 products
    return lastTenProducts.some((item) => item._id === productId);
  };
  useEffect(() => {
    fetchProductData();
  }, [ product,all_products]);

  
  if (!product) {
    return <div> ...Loading </div>;
  }

  const gotocart = (id) =>{
    if (!token) {
      toggleModal();
    }else{
      addToCart(id);

  }
}


  return (
    <section className="  flex mt-8 xl:mt-6  px4">
    <div className='   flex lg:gap-x-12 gap-y-9 flex-col lg:flex-row  bg-primary w-full py-16 px-3 '>
      {/* Product images */}
      <div className='flex flex-row max-w-max h-full  gap-3'>
          {/* select images  */}  
          <div className='flex flex-col sm:gap-2 gap-1 md:min-w-28  min-w-20 h-full '>
            {product.images.map((item, i) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={i}
                alt={`product ${i}`}
                className="h-[70px] md:h-[93px]  rounded-lg cursor-pointer transition-transform duration-300  hover:scale-105 "        
                      />
            ))}
          </div>
          {/* main image  */}
          <div className=' flexCenter'>
            <div className='w-full h-full flexCenter bg-transparent p-0 rounded-xl overflow-hidden'>
              <Image 
                src={image} 
                alt='product main' 
                className='h-full w-full max-w-[500px] object-contain rounded-xl'
              />
            </div>
          </div>
      </div>
      {/* Product info */}
      <div className='flex-[1.5] rounded-2xl xl:px-7 w-full  px-2'>
            <h3 className='h3 my-2.5 block'>{product.name}</h3>
            {/* Rating & Price */}
            <div className=' items-baseline gap-x-5 flex'>
              <h3 className='h3 min-w-20'>${product.price}</h3>
              <div className='flex items-center gap-x-2 text-secondary mb-2'>
                <div className='flex gap-x-1 text-secondary text-xl'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <span>(122)</span>
              </div>
            </div>
            <div className='flex'>
              {product.status === "Out stock" &&(<p className='text-red-500   border-2 p-1 px-2 rounded-md   border-red-500'>Out of stock</p>)}
              {product.status === "On order" &&(<p className= 'text-blue-500 border-2 p-1 px-2 rounded-md   border-blue-500'>On order</p>)}
              {product.status === "In stock" && (<p className='text-green-500  border-2 p-1 px-2  rounded-md   border-green-500'>In stock</p>)}
            </div>

            <p>{product.info}</p>
            {/* Cart and Wishlist Buttons */}

            <div className="flex gap-4 mb-8 max-w-[555px] flex-wrap">
                <FavoriteButton productId={product._id} toggleModal={toggleModal}/>
              <button
                onClick={()=>gotocart(product._id)}
                className="btn-dark rounded-md sm:!px-20 !py-2 flexCenter  gap-x-2 animation-btns hover:bg-blue-500"
              >
                Add to cart
                <LuMoveUpRight className="text-xl" />
              </button>
           
            </div>

        <p>
          <span className="medium-16 text-tertiary">Category:</span> {product.category} | {product.subCategory} | {product.name} 
        </p>
        <p>
          <span className="medium-16 text-tertiary">Tags:</span> Modern  { product.popular ? '| Popular product' :'' } { isLastTenProduct(product._id) ? '| New Arrival' :'' }
        </p>
            {/* Share Section */}
        <div>
            {/* we sould to deploy the app to get the url of the product page */}
            <ShareProduct productName={product.name} productUrl={window.location.href} /> 
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProductMd;
