import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import empty from '../../assets/empty.svg'; // Path to your image

const Empty = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col   items-center -mt-6  mb-12 p-10 !pt-1 text-center ">
    {/* Cart Image */}
    <img src={empty} alt="Empty Cart" className="w-80 mb-4 " />

      {/* Cart Message */}
      <h2 className="text-2xl font-bold mb-3">
        No item yet to    <span className="text-rose-500">Compare!</span>
      </h2>
      <p className="text-gray-600 mb-7">
      Go now to add item to Compare product</p>

      {/* Return to Shop Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center px-6 py-3 bg-blue-800/60 text-white rounded-full shadow-lg hover:bg-blue-500 animation-btn"
      >
        <FaShoppingBag className="mr-2" />  Go now
      </button>
    </div>
  );
};

export default Empty;
