import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import { IoCallSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { ShopContext } from '../../../pages/context/ShopContext';

const Footer = () => {
  const { webSiteInfo } = useContext(ShopContext);
  return (
    <footer className='flex w-full '>
      <div className="bg-tertiary text-white py-10 px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start">
            <Link to={'/'} className="bold-24 mb-4">
              <h3><span className="text-secondary">{webSiteInfo?.siteName}</span></h3>
            </Link>
            <p className="text-center md:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti aut maxime voluptas quam tempora pariatur, eum dolore neque odio praesentium
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="bold-20 mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-y-4 regular-15 text-gray-30">
              <li><Link to="/" className="hover:text-secondary">Home</Link></li>
              <li><Link to="/collection" className="hover:text-secondary">Collections</Link></li>
              <li><Link to="/about" className="hover:text-secondary">About</Link></li>
              <li><Link to="/contact" className="hover:text-secondary">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg mb-4">Contact Us</h4>
            <div className="flex flex-col gap-y-2">
              <p className="flex items-center gap-x-4 medium-15">
                <IoIosMail className="text-[20px]" />
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${webSiteInfo?.contactEmail}`}
                  className="hover:text-secondary hover:underline"
                >
                  {webSiteInfo?.contactEmail}
                </a>

              </p>
              <p className="flex items-center gap-x-4 medium-15">
                <IoCallSharp className="text-[20px]" />
                <span title='Supprot phone'>
                 +216( {webSiteInfo?.contactPhone} )
                </span>
              </p>
              {/* this link navigate to google map  to showing the address  */}
              <p className="flex items-center gap-x-4 medium-15">
                <FaMapMarkerAlt className="text-[20px]" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(webSiteInfo?.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title='open with googleMap'
                  className="hover:text-secondary  hover:underline"
                >
                   {webSiteInfo?.address}
                </a>

              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <p className="text-center text-sm flex-col content-between">
              &copy; {new Date().getFullYear()} {webSiteInfo?.siteName} | All rights reserved
            </p>
            {/*  social media icon button  */}
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
