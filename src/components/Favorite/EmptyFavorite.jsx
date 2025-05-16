    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { FaShoppingBag } from 'react-icons/fa';
    import emptyImage from '../../assets/emptyfavorite.svg'; // Path to your image
    
    const EmptyCart = () => {
      const navigate = useNavigate();
    
      return (
        <div className="flex flex-col   items-center !pt-0 p-10 text-center ">
        {/* Cart Image */}
        <img src={emptyImage} alt="Empty Cart" className="w-72 mb-4 " />
    
          {/* Cart Message */}
          <h2 className="text-2xl font-bold mb-3">
            Your Favorite  is <span className="text-rose-500">Empty!</span>
          </h2>
          <p className="text-gray-600 mb-7">
            Must add items on the Favorite .
          </p>
    
          {/* Return to Shop Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-3 bg-rose-500 text-white rounded-full shadow-lg hover:bg-red-700 transition"
          >
            <FaShoppingBag className="mr-2" />  shooe now
          </button>
        </div>
      );
    };
    
    export default EmptyCart;
    