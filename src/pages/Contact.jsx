import React, { useContext } from "react";
import { FaPhoneAlt, FaEnvelope, FaUser, FaUserAlt, FaMailBulk, FaMobileAlt, FaRegCommentDots, FaAddressBook, FaAddressCard, FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { ShopContext } from "./context/ShopContext";

function ContactPage() {
  const {webSiteInfo} = useContext(ShopContext);
  return (
    <section className="pt-24">
      <div className=" bg-red-50  shadow-2xl mt-4 py-12  rounded-2xl  mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Side: Contact Info */}
        <div className="space-y-6 pt-4 pl-1">
          <h2 className="text-3xl font-bold text-tertiary">Get in Touch</h2>
          <p className="text-gray-400">
            You need more information? Check what other persons are saying about our product. They
            are very happy with their purchase.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl text-tertiary" />
              <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(webSiteInfo?.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title='Open with googleMap'
                  className="text-gray-30 hover:underline"

                >
                   {webSiteInfo?.address}
                </a>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-xl text-tertiary" />
              <a
                  title="Open with Send mail"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${webSiteInfo?.contactEmail}`}
                  className="text-gray-30 hover:underline"
                >
                  {webSiteInfo?.contactEmail}
                </a>
            </div>
            <div className="flex items-center gap-3">
              <BiSupport className="text-2xl text-tertiary" />
              <span 
                  className="text-gray-30 "
                  title="Supprot Phone" 
                  >
                   +216({webSiteInfo?.contactPhone})
              </span>
              
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white text-gray-900 px-9  py-7 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Contact us</h2>
          <form className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <FaUserAlt className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg   focus:outline-red-300 "
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg  focus:outline-red-300"
                />
              </div>
            </div>
            {/* Email */}
            <div className="relative  ">
              <FaMailBulk className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg  focus:outline-red-300 "
              />
            </div>
            {/* Phone Number */}
            <div className="relative">
              <FaMobileAlt className="absolute left-4 top-4 text-gray-400" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg  focus:outline-red-300 "
              />
            </div>
            {/* Message */}
            <div className="relative">
              <FaRegCommentDots className="absolute left-4 top-4 text-gray-400" />
              <textarea
                placeholder="Message"
                rows="5"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg   focus:outline-red-300  "
              />
            </div>
            {/* Privacy Policy */}
            <div className="flex items-start gap-2 pl-1 ">
              <input type="checkbox" className="mt-1 cursor-pointer" />
              <label className="text-sm text-gray-600">
                You agree to our <span className="text-blue-600">Privacy Policy</span>.
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 animation-btns text-white bg-black rounded-lg hover:bg-orange-900 transition-transform duration-200 focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
