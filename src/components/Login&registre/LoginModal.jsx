import React, { useEffect, useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const LoginModal = ({ setShowLogin,isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  
  // Switch between SignUp and SignIn forms
  const toggleForm = () => {
    setFadeOut(true);  // Trigger fade-out animation
    setTimeout(() => {
      setIsSignUp((prev) => !prev);  // Switch forms after fade-out
      setFadeOut(false);  // Trigger fade-in animation for new form
    }, 300); // Duration matches CSS transition time
  };
   // Switch between SignUp and SignIn forms
   const close = () => {
    onClose();
  };

  return (
  
     <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center place-items-center transition-opacity duration-300  ${
        isOpen? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >

       <div 
        className={` relative bg-white  rounded-xl shadow-lg max-w-md w-full h-[460px] px-6 pt-1 ${
          isOpen ? 'animate-slideInTop' : 'animate-slideOutTop'
        }`}
        >

        <div className={`p-6 transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {/* button close  */}
          <button onClick={close }
                  className=" absolute  top-3 right-4 px-2 pb-2 pt-1 z-50  rounded-full justify-center items-center  h-8  
                  bg-white text-black  dark:hover:bg-blue-500 dark:hover:text-white" 
                
                >
                  &times;
                </button>
          {isSignUp ? (
            <SignUpForm setShowLogin={setShowLogin} toggleForm={toggleForm} close={close} />
          ) : (
            <SignInForm setShowLogin={setShowLogin}  toggleForm={toggleForm} close={close} />
          )}
          
        
        </div>
      </div>
    </div>
  );
};

export default LoginModal;