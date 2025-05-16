import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiGooglehome, SiAtlassian, SiMaildotcom } from 'react-icons/si';


const Navbar = ({ containerStyles }) => {
  // Navigation items
  const navItems = [
    { to: "/", label: "Home", icon: <SiGooglehome /> },
    { to: "/about", label: "About", icon: <SiAtlassian /> },
    { to: "/contact", label: "Contact", icon: <SiMaildotcom /> },
  ];

  return (
              
    <div className={containerStyles }>
      {/* Navigation items */}
      {navItems.map(({ to, label, icon }) => (
        <div key={label} className="inline-flex ">
          <NavLink
            to={to}
            className={({ isActive }) =>
              (isActive
                ? "active-link flexCenter gap-x-2"
                : "flexCenter gap-x-2 hover:text-secondary") + "  animation-btn"
            }
          
           >
            {icon}
            <h5>{label}</h5>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
