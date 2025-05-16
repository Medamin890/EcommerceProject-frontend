import React, { useContext, useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaCircleUser, FaHeart } from "react-icons/fa6" 
import { GiBeachBag} from "react-icons/gi"
import { FaBalanceScaleLeft, FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa"
import LoginModal from '../../Login&registre/LoginModal';
import Categorybar from './CategoryBar'
import SidebarMenu from './drawerNavBar';
import { ShopContext } from '../../../pages/context/ShopContext';
import axios from 'axios';
import { Tooltip } from 'antd';
import { BsPersonFillGear } from 'react-icons/bs';
const   Header = ({setShowLogin,isModalOpen, toggleModal}) => {
  const {getCartCount, token , setToken,setShowSearch,countfavorite,url, fetchFavorites,fetchCompares,countcompare,webSiteInfo} = useContext(ShopContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const navigate = useNavigate();
  const [ProfileImage, setProfileImage] = useState(""); // State to store the profile image URL


  // function to get profile image from db
  const getProfileImage = async () => {
    try {
      const response = await axios.get(url+"/api/user/getuser", {
        headers: {token},
      });
      setProfileImage(response.data?.user?.profileImage);
    } catch (error) {
      console.error('Error fetching pro file image:', error);
    }
  };
  useEffect(() => {
      getProfileImage();
  }, [token]); // Only run this effect if token changes

  // drawer 
  const [open, setOpen] = useState(false);
  const closeDrawer = () => {
    setMenuOpened(false)
    setOpen(false)
  };
 // LOGOUT function
  const logout =()=>{
    localStorage.removeItem("token");
    setToken("");
    setShowLogin(true)
    navigate("/");
    window.location.reload(); // forces full reload

  }

  // render page id change the token
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  },[token])
  // fetch favorite products from db
  useEffect(() => {
    if (token) {
      const controller = new AbortController();
      const fetchData = async () => {
        await fetchFavorites();
        await fetchCompares();
      };
      fetchData();
      return () => controller.abort(); // Cancel pending requests on unmount
    }
  }, [token,fetchCompares,fetchFavorites,countcompare,countfavorite]); // Only if you truly need favorites as a dependency


  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
    setOpen(!open);
  };

  return (
    <header className=' flex-col  w-full  fixed  shadow-sm  rounded-b-lg top-0 left-0 right-0  z-30 transition-all bg-white '>
      {/* top header Bar  */}
      <section className="flexBetween  w-full py-3 px-6">
          {/* Logo */}
          <Link to="/" className="bold-24 text-secondary animate-slideInRight">
                  <h4>{webSiteInfo?.siteName}</h4>
                </Link>
        <div className="flexBetween ">
                {/* Navbar */}
              <div className="relative flex-1">
                {/* Animated Navbar */}
                {!menuOpened &&
                  <Navbar 
                      containerStyles="hidden md:flex gap-x-5 xl:gap-x-8 medium-15 rounded-full px-2 py-1"
                      />
                    }
              </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 ">
            {/* Menu Icon */}
            {!menuOpened && (
              <FaBarsStaggered
              onClick={toggleMenu}
              className="md:hidden cursor-pointer text-2xl hover:text-secondary"
              />
            )}

          {/* Search Icon */}
          <Tooltip title="Search" placement="bottom" >

              <FaSearch onClick={() => {
                            setShowSearch((prev) => !prev);
                            navigate('/collection');
                          }}
                        className="text-xl cursor-pointer hover:text-secondary" 
              />
          </Tooltip>

          {/* favorite btn  */}
          <Tooltip title="My Favorites" placement="bottom"  >
          <button onClick={()=>navigate("/favorites")}  className="flex relative  cursor-pointer " >
              <FaHeart className=" text-3xl hover:text-secondary !w-5" />
              <span className="bg-secondary text-white medium-14  absolute -right-2.5 -top-2 flexCenter w-5 h-5 rounded-full shadow-inner">
              <span>{countfavorite}</span>
              </span>
            </button>
          </Tooltip>
          {/* Compare btn  */}
          <Tooltip title="Compares List" placement="bottom"  >
          <button onClick={()=>navigate("/compares")} className="flex relative  cursor-pointer " >
              <FaBalanceScaleLeft className=" text-3xl hover:text-secondary !w-5" />
              <span className="bg-secondary text-white medium-14  absolute -right-2.5 -top-2 flexCenter w-5 h-5 rounded-full shadow-inner">
              <span>{countcompare}</span>
              </span>
            </button>
          </Tooltip>

          {/* Cart */}
          <Tooltip title="My Cart" placement="bottom" >
          <Link to="/cart" className="flex relative">
              <GiBeachBag className="text-2xl hover:text-secondary" />
              <span className="bg-secondary text-white medium-14  absolute -right-0.5 -top-3 flexCenter w-5 h-5 rounded-full shadow-inner">
              <span>{getCartCount()}</span>
              </span>
            </Link>
          </Tooltip>

            {/* Login / Account Menu */}
            { !token ? (
              <div >
              <button
                onClick={toggleModal}
                className="rounded-full btn-outline  text-black hover:text-white hover:border-blue-600  hover:bg-blue-600  transition duration-200"
              >
                Login
              </button>

              {/* MOdalLogin  */} 
                  <LoginModal  setShowLogin={setShowLogin} isOpen={isModalOpen} onClose={toggleModal} className='animation-slideInTop'/>
            </div>
            ) : (
              // profile button 
              <div className="relative group">
                <button className=' border-2 rounded-full border-blue-500'>
                  {ProfileImage ? (
                    <img
                      src={ProfileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full  "
                    />
                  ) : (

                  <FaCircleUser className="text-3xl " />
                  )}
                </button>
                <ul className="absolute  right-0 flex-col hidden w-32 p-2 rounded-xl shadow-sm bg-white ring-1 ring-slate-900/15 group-hover:flex group-hover:animate-fadeIn  group-hover:duration-200">
                  {/* Profile */}
                  <li >
                    <button  onClick={()=>navigate("/Profile")}
                    className="flexStart gap-x-2 w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-400 hover:rounded-md" 
                    >
                      <BsPersonFillGear className=" !text-xl" />
                      Profile
                    </button>
                  </li>
                  {/* Order Item */}
                  <li >
                    <button  onClick={()=>navigate("/myorders")}
                    className="flexStart gap-x-2 w-full px-2.5 py-2  text-sm text-blue-700 hover:bg-gray-200 hover:text-blue-500 hover:rounded-md" 
                    >
                      <FaShoppingCart />
                      Order
                    </button>
                  </li>
                  {/* Logout Item */}
                  <li>
                    <button
                      onClick={()=>logout()}
                      className="flexStart gap-x-2 w-full px-3 py-2 text-sm text-red-700  hover:bg-gray-200 hover:text-red-500 hover:rounded-md"
                      >
                      <FaSignOutAlt  />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* category  */}
      { menuOpened ?
            <SidebarMenu open={open} onClose={closeDrawer} />
       :    
        <section className='hidden md:flex w-full'>
              <Categorybar />
           </section>
      }
    </header>
  );
};

export default Header;
