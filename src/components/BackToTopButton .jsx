import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  // State to manage button visibility
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Show button after scrolling 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
        <button
        onClick={scrollToTop}
        className="flex fixed bottom-5 right-5 w-12 h-12 items-center justify-center bg-orange-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition duration-300"
      >
        <p className="m-0 text-xl text-white">↑</p>
      </button>
      
    )
  );
};

export default BackToTopButton;
