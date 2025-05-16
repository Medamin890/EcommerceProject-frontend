import React from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdCurrencyExchange } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { TbPackageImport } from "react-icons/tb";
import Title from '../Home/Title';

const Features = () => {
  return (
    <section>
      {/* title  */}
      <div className='px-16'>
        <Title title="Features" titleStyles="text-center" />
      </div>
      {/* Features  */}
    <div className=" bg-primary   py-8 rounded-xl mb-4 px-16 w-full" >
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

         <div className="flex flex-row gap-x-4 items-center w-full ">
          <LiaShippingFastSolid className="text-4xl flex flex-col" />
          <div className='flex flex-col'>
            <h5 className="medium-18">Fast Shipping</h5>
            <p>On orders above $100</p>
          </div>
        </div>

        <div className="flex flex-row gap-x-4 items-center w-full">
        <MdCurrencyExchange className="text-4xl flex flex-col" />
          <div className='flex flex-col'>
            <h5 className="medium-18">Easy Exchanges</h5>
            <p>Within 30 days of purchase</p>
          </div>
        </div>

        <div className="flex flex-row gap-x-4 items-center w-full">
        <BiSupport className="text-4xl flex flex-col" />
          <div className='flex flex-col'>
            <h5 className="medium-18">24/7 Support</h5>
            <p>Always here to help</p>
          </div>
        </div>

        <div className="flex flex-row gap-x-4 items-center w-full">
        <TbPackageImport className="text-4xl flex flex-col" />
          <div className='flex flex-col'>
            <h5 className="medium-18">Easy Returns</h5>
            <p>Hassle-free returns</p>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
};

export default Features;
