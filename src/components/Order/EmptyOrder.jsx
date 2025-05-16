import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import emptyImage from '../../assets/emptyorder.svg'; // Path to your image

const EmptyOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col   items-center mt-36 mb-12 p-10 text-center ">
    {/* Cart Image */}
    <img src={emptyImage} alt="Empty Cart" className="w-72 mb-4 " />

      {/* Cart Message */}
      <h2 className="text-2xl font-bold mb-3">
        You don't have any <span className="text-rose-500">order!</span>
      </h2>
      <p className="text-gray-600 mb-7">
      Go now to place a new order      </p>

      {/* Return to Shop Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center px-6 py-3 bg-green-800/60 text-white rounded-full shadow-lg hover:bg-green-500 animation-btn"
      >
        <FaShoppingBag className="mr-2" />  shop now
      </button>
    </div>
  );
};

export default EmptyOrder;
