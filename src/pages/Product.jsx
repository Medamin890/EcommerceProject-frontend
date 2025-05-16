import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductHd from '../components/Product/ProductHd';
import ProductMd from '../components/Product/ProductMd';
import ProductDescriptionAndDetails from '../components/Product/ProductDescriptionAndDetails';
import SimilarProducts from '../components/Product/SimilarProducts';
import { ShopContext } from './context/ShopContext';
// import ScrollToTop from '../components/ScrollToTop';

const Product = ({toggleModal}) => {
    const { all_products } = useContext(ShopContext);
    const { productId } = useParams();
  // Find the specific product by matching productId (search by id ) with each product's _id
  const product = all_products.find((e) => e._id === productId);

  // If the product is not found, display an error message
  if (!product) {
    return <div className='h1 pt-28'>Product not Found</div>;
  }

  return (
    <section className='  py-28 '>
      {/* <ScrollToTop/> */}
      <ProductHd product={product} autoFocus={true}/>
      <div  className=' sm:px-10  px-2'>
        <ProductMd product={product}  toggleModal={toggleModal}/>
        <ProductDescriptionAndDetails product={product}/>
        <SimilarProducts similarCategory={product.subCategory} currentProductId={productId} />
      </div>
    </section>
    
  );
};

export default Product;

