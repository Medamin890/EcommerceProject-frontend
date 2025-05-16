import React, { useContext } from 'react';
import { ShopContext } from '../../pages/context/ShopContext';

const CartTotal = () => {
  const { currency, getTotalCartAmount } = useContext(ShopContext);
  const cartAmount = getTotalCartAmount();
  let delivery =0;
  if (cartAmount <= 300){
        delivery = 10;
      }
  const shippingFee = cartAmount === 0 ? 0 : delivery ;
  const totalAmount = cartAmount + shippingFee;
  return (
    <div className='w-full'>
      <h3 className='bold-22 mb-5'>
        Cart <span className='text-secondary'>Total</span>
      </h3>
      <div className='flexBetween pt-3'>
        <h4 className='h4'>SubTotal:</h4>
        <p className='bold-16'>
          {currency} {cartAmount}.00
        </p>
      </div>
      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
      <div className='flexBetween pt-3'>
        <h4 className='h4'>Shipping Fee:</h4>
        <p className='bold-16'>
          {currency} {shippingFee}.00
        </p>
      </div>
      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
      <div className='flexBetween pt-3'>
        <h4 className='h4'>Total:</h4>
        <p className='bold-16'>
          {currency} {totalAmount}.00
        </p>
      </div>
      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />
    </div>
  );
};

export default CartTotal;
