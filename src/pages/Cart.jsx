import React, { useContext, useEffect, useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import CartTotal from '../components/Product/CartTotal.jsx';
import { Commet } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from './context/ShopContext.jsx';
import EmptyCart from '../components/Cart/EmptyCart.jsx'; 
const Cart = () => {
  const { getCartCount, all_products, cartItems, currency, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    const initialQuantities = {};
    console.log("cartItems", cartItems);
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        tempData.push({
          _id: itemId,
          quantity: cartItems[itemId],
        });
        initialQuantities[itemId] = cartItems[itemId];
      }
    }

    setCartData(tempData);
    setQuantities(initialQuantities);

    // Set a timer to stop loading after 1.2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Clear the timer if the component unmounts before 1.2 seconds
    return () => clearTimeout(timer);
  }, [cartItems]);

  const increment = (id) => {
    const newValue = (quantities[id] || 0) + 1;
    setQuantities((prev) => ({ ...prev, [id]: newValue }));
    updateQuantity(id, newValue);
  };

  const decrement = (id) => {
    if (quantities[id] > 1) {
      const newValue = quantities[id] - 1;
      setQuantities((prev) => ({ ...prev, [id]: newValue }));
      updateQuantity(id, newValue);
    } else {
      updateQuantity(id, 0);
    }
  };

  return (
    <section>
      <div className='p-8 px-16 pt-24 bg-white rounded-2xl my-16'>
        { cartData.length === 0 
        ?   <EmptyCart/>
        :
        <div>
        <div className='flex items-baseline gap-x-4'>
          <h3 className='h3'>
            Cart <span className='text-secondary'>List</span>
          </h3>
          <p className='bold-20'>{getCartCount()} items</p>
        </div>
        {loading ? (
          <div className="flexCenter w-full h-[400px] text-black">
            <Commet color="#43c2d1" size="medium" text="" textColor="" />
          </div>
        ) : (
          <div>
          <div className='mt-6 '>
            {cartData.map((item) => {
              const productData = all_products.find((product) => product._id === item._id);
              return (
                <div key={item._id} className='p-1 rounded-lg my-4'>
                  <div className='flex items-center gap-x-3'>
                    <div className='flex items-start gap-6'>
                      <img
                        src={productData?.images[0]}
                        alt="product"
                        className='w-16 sm:w-18 rounded'
                      />
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='flex justify-between'>
                        <h5 className='h5 my-0 line-clamp-1'>{productData?.name}</h5>
                        <FaRegWindowClose
                          onClick={() => updateQuantity(item._id, 0)}
                          className='cursor-pointer text-secondary animation-btns hover:!scale-125'
                        />
                      </div>
                      <div className='flex justify-between mt-2'>
                        <div className='flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary'>
                          <button
                            className='p-1.5 bg-white hover:bg-slate-200 animation-btns text-secondary rounded-full shadow-md'
                            onClick={() => decrement(item._id)}
                          >
                            <FaMinus className='text-xs' />
                          </button>
                          <p className='px-2 block pt-1 mb-3 text-black'>{quantities[item._id]}</p>
                          <button
                            className='p-1.5 bg-white hover:bg-slate-200 animation-btns text-secondary rounded-full shadow-md'
                            onClick={() => increment(item._id)}
                          >
                            <FaPlus className='text-xs' />
                          </button>
                        </div>
                        <h4 className='h4'>
                          {currency}
                          {productData?.price}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        <div>
          <hr className='mx-auto h-[1px] w-4/5 bg-gray-900/10 my-2' />
        </div>
        <div>
          <CartTotal />
          <button onClick={() => navigate('/place-order')} className='btn-secondary animation-btns rounded-md hover:bg-secondary/50 mt-7'>
            Proceed to Checkout
          </button>
        </div>
      </div>
        )}
      </div>
      }
      </div>
    </section>
  );
};

export default Cart;
