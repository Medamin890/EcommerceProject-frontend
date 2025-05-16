import React, { useContext } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../pages/context/ShopContext';
import { HiOutlineShoppingCart } from "react-icons/hi2";

const Item = ({ product , toggleModal  }) => {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div className="ring-1 ring-slate-900/5 rounded-xl overflow-hidden bg-white hover:scale-105   rounded-b-3xl shadow-md transition-transform duration-200  hover:shadow-xl h-92 animate-fadeIn">
      {/* Image Link */}
    
      <Link to={`/product/${product._id}`} className="relative  flexCenter" >
        <img 
          src={product.images[0]} 
          alt="productImg" 
          height={200} 
          width={200} 
          className="object-cover h-52 w-40"
        />
      </Link>

      {/* Product Info */}
      <div className="p-3 pt-4 bg-primary  w-full text-center  rounded-b-3xl">
        <h4 className="text-lg font-semibold line-clamp-1">{product.name}</h4>
        <h6 className="text-sm font-medium text-gray-600 mb-1">
                  {product.category} / {product.subCategory}
                  {product.subSubCategory && <span> / {product.subSubCategory}</span>}
                </h6>
        <div className=' flexCenter p-2'>
            {product.status === "Out stock" &&(<p className='text-red-500   border-2 p-1 px-2 rounded-md   border-red-500'>Out of stock</p>)}
            {product.status === "On order" &&(<p className= 'text-blue-500 border-2 p-1 px-2 rounded-md   border-blue-500'>On order</p>)}
            {product.status === "In stock" && (<p className='text-green-500  border-2 p-1 px-2  rounded-md   border-green-500'>In stock</p>)}
        </div>
        {/* Price and Cart Button */}
        <div className="flex justify-between items-center  pr-2 pl-4 ">
          <div className="text-secondary font-bold">${product.price} </div>
          {/* button  */}
          <div>
              <button 
                  title='Shop now' 
                  className="bg-white h-10  block    w-full p-3 rounded-3xl shadow-inner cursor-pointer  flexCenter  transition duration-200 hover:bg-secondary hover:border-white border border-gray-50 hover:text-slate-100" 
                  onClick={!token ?  () => toggleModal() : () => navigate(`/product/${product._id}`)}
                  >
                    <HiOutlineShoppingCart className='mr-1' />
                    <b className="text  ml-1">Shop</b>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
