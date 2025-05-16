import React, { useState } from 'react';
import Features from '../components/Product/Features.jsx';
import NewArrivals from '../components/Home/NewArrivals.jsx';
import PopularProducts from '../components/Home/Popular.jsx';
import HomeBannerCarousel from '../components/Home/HomeBunners.jsx';

const Home = ({toggleModal}) => {

  return (
    <div >
      <HomeBannerCarousel />
      <NewArrivals toggleModal={toggleModal}/>
      <PopularProducts  toggleModal={toggleModal}/>
      <Features />
    </div>
  );
};

export default Home;
