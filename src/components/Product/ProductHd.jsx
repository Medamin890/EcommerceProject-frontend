import React from 'react';
import { TbArrowRight } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const ProductHd = ({ product }) => {
  return (
    <div className=' rounded-tl-xl rounded-tr-xl flex items-center flex-wrap 
       gap-x-2 medium-16 p-4 pl-16 mt-2 capitalize bg-primary'
       >
         <Link to={'/'} className='hover:text-blue-500'>Home</Link>
         <TbArrowRight /> {product.name}
    </div>
  );
};

export default ProductHd;
