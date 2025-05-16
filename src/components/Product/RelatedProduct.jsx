import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import Item from './Item';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Create a shallow copy of the products array
      let filtered = products.slice();

      // Filter by category
      filtered = filtered.filter((item) => category === item.category);

      // Filter by subcategory
      filtered = filtered.filter((item) => subCategory === item.subCategory);

      // Set the state with the first 5 related products
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]); // Ensure category and subCategory are dependencies

  return (
    <div className='max-padd-container py-16'>
      <Title title={'Related Products'} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {related.map((product) => (
          <Item product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
